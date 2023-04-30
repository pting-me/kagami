import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { MessageForIframe } from "@figma-react-template/common";

interface MessageData {
  pluginMessage: MessageForIframe;
  pluginId: string;
}

export const MessageContext = createContext<
  MessageEvent<MessageData> | "outside-context" | null
>("outside-context");

export function MessageProvider(props: PropsWithChildren) {
  const { children } = props;

  const [messageEvent, setMessageEvent] =
    useState<MessageEvent<MessageData> | null>(null);

  useEffect(() => {
    window.onmessage = (e: MessageEvent<MessageData>) => {
      setMessageEvent(e);
    };
  }, []);

  return (
    <MessageContext.Provider value={messageEvent}>
      {children}
    </MessageContext.Provider>
  );
}
