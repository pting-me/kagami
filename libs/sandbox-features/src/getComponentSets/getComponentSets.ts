import { enrichNode, hasChildrenMixin } from '../utils';

/**
 * Gets all component set nodes under the current node
 * @param {BaseNode} [node=figma.root]
 * @returns {ComponentSetNode[]}
 */
const getComponentSet = (node?: BaseNode) => {
  const baseNode = node ?? figma.root;

  if (!hasChildrenMixin(baseNode)) {
    return [];
  }

  const componentSets = baseNode.findAllWithCriteria({
    types: ['COMPONENT_SET'],
  });

  return componentSets.map(enrichNode);
};

export default getComponentSet;
