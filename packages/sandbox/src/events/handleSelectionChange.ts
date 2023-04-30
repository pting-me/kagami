export function handleSelectionChange() {
  const selectedNodes = figma.currentPage.selection.map((node) => node.name);
  // sendMessage(createSelectionMessage(selectedNodes));
}
