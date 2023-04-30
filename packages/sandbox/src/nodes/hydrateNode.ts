import { componentProps, componentSetProps } from "./hydrationProps";

/**
 * Creates a prop reducer that converts an array of property names to values of the given node
 * @param node
 * @returns
 */
const createPropReducer = <TNode = BaseNode>(node: TNode) => {
  return (a: Partial<TNode>, v: keyof TNode) =>
    ({
      ...a,
      [v]: node[v],
      // TypeScript converts the keyof T to string, so we want to cast to Partial here
    } as Partial<TNode>);
};

export function hydrateNode<TNode extends BaseNode>(node: TNode) {
  switch (node.type) {
    case "COMPONENT": {
      return componentProps.reduce(
        createPropReducer<ComponentNode>(node),
        node
      ) as ComponentNode;
    }
    case "COMPONENT_SET": {
      const { children = [], ...rest } = componentSetProps.reduce(
        createPropReducer<ComponentSetNode>(node),
        node
      );
      return {
        ...rest,
        children: (children as ComponentNode[]).map((child: ComponentNode) =>
          componentProps.reduce(createPropReducer<ComponentNode>(child), child)
        ),
      } as ComponentSetNode & { children: ComponentNode[] };
    }
    default: {
      return node;
    }
  }
}
