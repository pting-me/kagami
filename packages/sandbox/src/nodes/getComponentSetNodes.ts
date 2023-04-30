import { hasChildrenMixin } from "./hasChildrenMixin";
import { hydrateNode } from "./hydrateNode";

/**
 * Gets all component set nodes under the current node
 * @param {BaseNode} [node=figma.root]
 * @returns {ComponentSetNode[]}
 */
export function getComponentSetNodes(node?: BaseNode) {
  const baseNode = node ?? figma.root;

  if (!hasChildrenMixin(baseNode)) {
    return [];
  }

  const componentSets = baseNode.findAllWithCriteria({
    types: ["COMPONENT_SET"],
  });

  return componentSets.map(hydrateNode) as (ComponentSetNode & {
    children: ComponentNode[];
  })[];
}
