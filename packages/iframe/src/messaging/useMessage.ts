import { useContext } from "react";

import { MessageContext } from "./MessageContext";

export function useMessage() {
  const messageEvent = useContext(MessageContext);
  console.log(messageEvent);

  if (messageEvent === "outside-context") {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return messageEvent?.data.pluginMessage;
}
