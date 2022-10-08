import { hydrateComponentProps, hydrateComponentSetProps } from '@kagami/types';

/**
 * Creates a prop reducer that converts an array of property names to values of the given node
 * @param node
 * @returns
 */
const createPropReducer = <T = BaseNode>(node: T) => {
  return (a: Partial<T>, v: keyof T) =>
    ({
      ...a,
      [v]: node[v],
      // TypeScript converts the keyof T to string, so we want to cast to Partial here
    } as Partial<T>);
};

const hydrateNode = (node: BaseNode) => {
  switch (node.type) {
    case 'COMPONENT': {
      return hydrateComponentProps.reduce(
        createPropReducer<ComponentNode>(node),
        node
      ) as ComponentNode;
    }
    case 'COMPONENT_SET': {
      const { children = [], ...rest } = hydrateComponentSetProps.reduce(
        createPropReducer<ComponentSetNode>(node),
        node
      );
      return {
        ...rest,
        children: (children as ComponentNode[]).map((child: ComponentNode) =>
          hydrateComponentProps.reduce(
            createPropReducer<ComponentNode>(child),
            child
          )
        ),
      } as ComponentSetNode & { children: ComponentNode[] };
    }
    default: {
      return node;
    }
  }
};

export default hydrateNode;
