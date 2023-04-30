import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { MessageForIframe } from "@kagami/common";

interface MessageData {
  pluginMessage: MessageForIframe;
  pluginId: string;
}

export const MessageContext = createContext<
  MessageEvent<MessageData> | null | undefined
>(undefined);

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
