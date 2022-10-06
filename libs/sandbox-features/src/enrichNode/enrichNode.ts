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

const enrichNode = (node: BaseNode) => {
  const commonProps: (keyof BaseNode)[] = ['name', 'type'];
  const componentProps: (keyof ComponentNode)[] = [...commonProps];
  const componentSetProps: (keyof ComponentSetNode)[] = [
    ...commonProps,
    'children',
    'variantGroupProperties',
  ];

  switch (node.type) {
    case 'COMPONENT': {
      return componentProps.reduce(
        createPropReducer<ComponentNode>(node),
        node
      );
    }
    case 'COMPONENT_SET': {
      const { children = [], ...rest } = componentSetProps.reduce(
        createPropReducer<ComponentSetNode>(node),
        node
      );
      return {
        ...rest,
        children: (children as ComponentNode[]).map((child: ComponentNode) =>
          componentProps.reduce(createPropReducer<ComponentNode>(child), child)
        ),
      };
    }
    default: {
      return node;
    }
  }
};

export default enrichNode;
