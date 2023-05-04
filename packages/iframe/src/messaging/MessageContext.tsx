import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  isMessageForIframe,
  isMessageForSandbox,
  MessageForIframe,
} from "@kagami/common";

import { NodeContext } from "../nodes/NodeContext";
import { IS_MOCK } from "../utils/env";

interface MessageData {
  pluginMessage: MessageForIframe;
  pluginId: string;
  /** For React Devtools */
  source?: string;
}

interface MessageContextValue {
  message: MessageForIframe | null;
  claim: () => void;
}

export const MessageContext = createContext<MessageContextValue | null>(null);

export function MessageProvider(props: PropsWithChildren) {
  const { children } = props;

  const [queue, setQueue] = useState<MessageForIframe[]>([]);

  useEffect(() => {
    window.onmessage = (e: MessageEvent<MessageData>) => {
      e.data.pluginMessage && setQueue((q) => q.concat(e.data.pluginMessage));
    };
  }, []);

  const message = useMemo(() => {
    return queue.length > 0 ? queue[0] : null;
  }, [queue]);

  const claim = () => {
    setQueue((q) => q.slice(1));
  };

  const {
    setComponentNodes = () => {
      /* noop */
    },
    setComponentSetNodes = () => {
      /* noop */
    },
  } = useContext(NodeContext) ?? {};

  useEffect(() => {
    switch (message?.type) {
      case "nodes/update":
        setComponentNodes(message.payload.componentNodes);
        setComponentSetNodes(message.payload.componentSetNodes);
        break;
      default:
        break;
    }

    if (IS_MOCK && message) {
      if (isMessageForIframe(message)) {
        console.log("Receiving message (from mocked sandbox):\n", message);
      }
      if (isMessageForSandbox(message)) {
        console.log("Sending message to sandbox:\n", message);
      }
    }

    if (message) {
      claim();
    }
  }, [message, setComponentNodes, setComponentSetNodes]);

  return (
    <MessageContext.Provider value={{ message, claim }}>
      {children}
    </MessageContext.Provider>
  );
}
