interface Payload {
  id: string;
}

export const focusNode = (payload: Payload) => {
  const { id } = payload;

  // We know that every node being passed must be component or component set
  const component = figma.getNodeById(id) as ComponentNode | ComponentSetNode;
  const page = figma.currentPage;

  if (component) {
    figma.viewport.scrollAndZoomIntoView([component]);
    page.selection = [component];
  }
};
