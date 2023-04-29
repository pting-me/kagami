import { createSelectionMessage } from "@figma-react-template/common";

import { sendMessage } from "../messaging/sendMessage";

export function handleSelectionChange() {
  const selectedNodes = figma.currentPage.selection.map((node) => node.name);
  sendMessage(createSelectionMessage(selectedNodes));
}
