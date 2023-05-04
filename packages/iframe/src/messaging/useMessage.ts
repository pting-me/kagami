import { useContext } from "react";

import { MessageContext } from "./MessageContext";

export function useMessage() {
  const context = useContext(MessageContext);

  if (context === null) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return context;
}
