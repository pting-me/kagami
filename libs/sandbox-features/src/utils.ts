/**
 * Narrowing function for nodes with children
 * Only to be used in the sandbox with all the mixin functionality
 * @param {BaseNode} node
 * @returns {boolean}
 */
export const hasChildrenMixin = (
  node: BaseNode
): node is BaseNode & ChildrenMixin => {
  // Note that we can't use `hasOwnProperty` to detect mixins
  // We're not worried about `any` typing here since we're just checking properties
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!Object.keys(Object.getPrototypeOf(node)).includes('children')) {
    return false;
  }
  return true;
};

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

export const enrichNode = (node: BaseNode) => {
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
