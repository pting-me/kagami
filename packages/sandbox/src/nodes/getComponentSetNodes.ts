import { hasChildrenMixin } from "./hasChildrenMixin";
import { hydrateNode } from "./hydrateNode";

/**
 * Gets all component set nodes under the current node
 */
export function getComponentSetNodes(node?: BaseNode): ComponentSetNode[] {
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
