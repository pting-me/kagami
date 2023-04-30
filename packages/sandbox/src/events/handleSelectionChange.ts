import { createSelectionMessage } from "@kagami/common";

import { sendMessage } from "../messaging/sendMessage";

export function handleSelectionChange() {
  const selectedNodes = figma.currentPage.selection.map((node) => node.name);
  sendMessage(createSelectionMessage(selectedNodes));
}
