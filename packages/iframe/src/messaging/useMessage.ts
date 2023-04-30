import { useContext } from "react";

import { MessageContext } from "./MessageContext";

export function useMessage() {
  const messageEvent = useContext(MessageContext);

  if (messageEvent === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return messageEvent?.data.pluginMessage;
}
