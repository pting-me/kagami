import enrichNode from '../enrichNode';
import hasChildrenMixin from '../hasChildrenMixin';

/**
 * Gets all component set nodes under the current node
 * @param {BaseNode} [node=figma.root]
 * @returns {ComponentSetNode[]}
 */
const getComponentSetNodes = (node?: BaseNode) => {
  const baseNode = node ?? figma.root;

  if (!hasChildrenMixin(baseNode)) {
    return [];
  }

  const componentSets = baseNode.findAllWithCriteria({
    types: ['COMPONENT_SET'],
  });

  return componentSets.map(enrichNode) as (ComponentSetNode & {
    children: ComponentNode[];
  })[];
};

export default getComponentSetNodes;
