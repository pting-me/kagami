import hasChildrenMixin from './hasChildrenMixin';
import hydrateNode from './hydrateNode';

/**
 * Gets all component nodes that are not part of a component set
 * @param {BaseNode} [node=figma.root]
 * @returns {ComponentNode[]}
 */
const getComponentNodes = (node?: BaseNode) => {
  const baseNode = node ?? figma.root;

  if (!hasChildrenMixin(baseNode)) {
    return [];
  }

  const componentNodes = baseNode.findAll((currentNode) => {
    if (currentNode.type !== 'COMPONENT') {
      return false;
    }

    if (currentNode.parent?.type === 'COMPONENT_SET') {
      return false;
    }

    return true;
  });

  return componentNodes.map(hydrateNode) as ComponentNode[];
};

export default getComponentNodes;
