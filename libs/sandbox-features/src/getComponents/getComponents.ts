import { enrichNode, hasChildrenMixin } from '../utils';

/**
 * Gets all component nodes that are not part of a component set
 * @param {BaseNode} [node=figma.root]
 * @returns {ComponentNode[]}
 */
const getComponents = (node?: BaseNode) => {
  const baseNode = node ?? figma.root;

  if (!hasChildrenMixin(baseNode)) {
    return [];
  }

  const components = baseNode.findAll((currentNode) => {
    if (currentNode.type !== 'COMPONENT') {
      return false;
    }

    if (currentNode.parent.type === 'COMPONENT_SET') {
      return false;
    }

    return true;
  });

  return components.map(enrichNode);
};

export default getComponents;
