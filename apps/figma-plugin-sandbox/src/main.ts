import {
  createHandleMessageFromView,
  postMessageToView,
} from '@hashi/sandbox-features';

const componentSets = figma.root.findAllWithCriteria({
  types: ['COMPONENT_SET'],
});

const components = figma.root.findAll((node) => {
  if (node.type !== 'COMPONENT') {
    return false;
  }

  if (node.parent.type === 'COMPONENT_SET') {
    return false;
  }

  return true;
});

figma.showUI(__html__, { themeColors: true, width: 1024, height: 576 });

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
        children: children.map((child: ComponentNode) =>
          componentProps.reduce(createPropReducer<ComponentNode>(child), child)
        ),
      };
    }
    default: {
      return node;
    }
  }
};

postMessageToView({
  type: 'setComponentSets',
  payload: componentSets.map(enrichNode),
});

postMessageToView({
  type: 'setComponents',
  payload: components.map(enrichNode),
});

// figma.ui.onmessage = createHandleMessageFromView(console.log);
