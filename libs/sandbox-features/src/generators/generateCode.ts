import handlebars from 'handlebars';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { CSSProperties } from 'react';

import reactTs from './reactTs.hbs?raw';

/**
 * Copied from plugin-api under ComponentSetNode
 */
type VariantProperties = {
  [property: string]: string;
} | null;

interface ChildNodePropHbsData {
  name: string;
  figmaNodeType: BaseNode['type']; // comes from SceneNode
  reactTsType: string; // calculated from figmaNodeType
}

interface VariantPropHbsData {
  name: string;
  required: boolean;
  defaultValue: string;
  reactTsType: string;
}

interface ComponentHbsData {
  serial: string;
  style: string;
  children: ComponentChildHbsData[];
}

interface ComponentChildHbsData {
  name: string;
  figmaNodeType: BaseNode['type']; // comes from SceneNode
  style: string;
  defaultValue: string;
}

interface HbsData {
  childNodeProps: ChildNodePropHbsData[];
  variantProps: VariantPropHbsData[];
  components: ComponentHbsData[];
  name: string;
}

export const pascalCase = (text: string) => upperFirst(camelCase(text));

export const valuesAreNumbers = (values: string[]) => {
  return values.reduce(
    (acc, value) => acc && String(Number(value)) === value,
    true
  );
};

export const valuesHaveDefault = (values: string[]) => {
  return values.reduce(
    (acc, value) => acc || value.toLowerCase() === 'default',
    false
  );
};

export const valuesAreBooleans = (values: string[]) => {
  if (values.length !== 2) {
    return false;
  }

  const lowerCaseValues = values.map((value) => value.toLowerCase());

  if (lowerCaseValues.includes('true') && lowerCaseValues.includes('false')) {
    return true;
  }

  return false;
};

export const serializeProperties = (variantProperties: VariantProperties) => {
  if (!variantProperties) {
    return '';
  }

  const sortedProperties = Object.entries(variantProperties).sort(
    ([aKey], [bKey]) => {
      return aKey.localeCompare(bKey);
    }
  );

  return sortedProperties.reduce(
    (str, [currKey, currVal]) =>
      `${str.toLowerCase()}--${currKey.toLowerCase()}-${currVal.toLowerCase()}`,
    ''
  );
};

const hasCornerMixin = (
  node: SceneNode
): node is SceneNode & RectangleCornerMixin => {
  return (node as SceneNode & RectangleCornerMixin).topLeftRadius !== undefined;
};

const getBorderRadius = (node: SceneNode) => {
  if (!hasCornerMixin(node)) {
    return '';
  }

  const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } =
    node;
  return `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;
};

const hasFillsMixin = (
  node: SceneNode
): node is SceneNode & MinimalFillsMixin => {
  const fillsType = typeof (node as SceneNode & MinimalFillsMixin).fills;
  return fillsType !== 'undefined' && fillsType !== 'symbol';
};

const getFillColor = (node: SceneNode) => {
  if (!hasFillsMixin(node) || typeof node.fills === 'symbol') {
    return '';
  }

  const visibleFills = (node.fills ?? []).filter(({ visible }) => visible);
  if (visibleFills.length === 0) {
    return '';
  }

  // TODO add support for multiple layers
  // TODO add support for other fill types
  const firstFill = visibleFills[0];
  if (firstFill.type !== 'SOLID') {
    return '';
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstFill;

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${opacity ?? 1})`;
};

const hasIndividualStrokesMixin = (
  node: SceneNode
): node is SceneNode & IndividualStrokesMixin => {
  return (
    (node as SceneNode & IndividualStrokesMixin).strokeTopWeight !== undefined
  );
};

const getBorderWidth = (node: SceneNode) => {
  if (!hasIndividualStrokesMixin(node)) {
    return '';
  }

  const {
    strokeTopWeight = 0,
    strokeRightWeight = 0,
    strokeBottomWeight = 0,
    strokeLeftWeight = 0,
  } = node;
  return `${strokeTopWeight}px ${strokeRightWeight}px ${strokeBottomWeight}px ${strokeLeftWeight}px`;
};

const hasMinimalStrokesMixin = (
  node: SceneNode
): node is SceneNode & MinimalStrokesMixin => {
  const strokesType = typeof (node as SceneNode & MinimalStrokesMixin).strokes;
  return strokesType !== 'undefined' && strokesType !== 'symbol';
};

const getBorder = (node: SceneNode) => {
  if (!hasMinimalStrokesMixin(node)) {
    return { borderStyle: '', borderColor: '' };
  }

  const visibleStrokes = (node.strokes ?? []).filter(({ visible }) => visible);
  if (visibleStrokes.length === 0) {
    return { borderStyle: 'none', borderColor: 'initial' };
  }

  // TODO add support for multiple layers
  // TODO add support for other background types(?)
  const firstStroke = visibleStrokes[0];
  if (firstStroke.type !== 'SOLID') {
    return { borderStyle: 'none', borderColor: 'initial' };
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstStroke;

  return {
    borderStyle: 'solid',
    borderColor: `rgba(${Math.round(r * 255)},${Math.round(
      g * 255
    )},${Math.round(b * 255)},${opacity ?? 1});`,
  };
};

const hasBaseFrameMixin = (
  node: SceneNode
): node is SceneNode & BaseFrameMixin => {
  return (node as SceneNode & BaseFrameMixin).paddingTop !== undefined;
};

const isTextNode = (node: SceneNode): node is TextNode => {
  return node.type === 'TEXT';
};

const getLineHeight = (lineHeight: LineHeight | symbol) => {
  if (typeof lineHeight === 'symbol') {
    return '';
  }

  if (lineHeight.unit === 'AUTO') {
    return 'normal';
  }

  const unit = lineHeight.unit === 'PIXELS' ? 'px' : '%';

  return `${lineHeight.value}${unit}`;
};

const getFont = (node: SceneNode) => {
  if (!isTextNode(node)) {
    return { fontFamily: '', fontSize: '', fontWeight: '', lineHeight: '' };
  }

  const fontFamily =
    typeof node.fontName === 'symbol'
      ? 'sans-serif'
      : `${node.fontName.family}, sans-serif`;

  const fontSize =
    typeof node.fontSize === 'symbol' ? '' : `${node.fontSize}px`;
  const fontWeight =
    typeof node.fontWeight === 'symbol' ? '' : String(node.fontWeight);

  const lineHeight = getLineHeight(node.lineHeight);

  return { fontFamily, fontSize, fontWeight, lineHeight };
};

interface ComputeStyleOptions {
  baseStyle: CSSProperties;
  boxStyle: CSSProperties;
  type: SceneNode['type'];
}

const computeStyle = (options: ComputeStyleOptions) => {
  const { baseStyle, boxStyle, type } = options;
  if (type === 'TEXT') {
    return JSON.stringify(baseStyle);
  }

  return JSON.stringify({ ...baseStyle, ...boxStyle });
};

const computeDefaultValue = (node: SceneNode) => {
  if (node.type === 'TEXT') {
    return `'${node.characters}'`;
  }

  if (node.type === 'INSTANCE') {
    return `
      <div
        style={{ backgroundColor: 'white', height: '100%', width: '100%' }}
      ></div>
    `;
  }

  return '';
};

interface GetChildNodesOptions {
  node: ComponentNode;
  registeredNames: string[];
}

const getComponentChildren = (options: GetChildNodesOptions) => {
  const { node, registeredNames: baseRegisteredNames } = options;
  const { children } = node;

  if (!children?.length) {
    return [];
  }

  // Array.map creates a new array so we don't have to worry
  // about altering content
  const registeredNames = baseRegisteredNames.map(camelCase);

  return children.map((childNode) => {
    const { name, type } = childNode;
    const { borderColor, borderStyle } = getBorder(childNode);
    const { fontFamily, fontSize, fontWeight, lineHeight } = getFont(childNode);

    // Get rid of property name conflicts
    let flag = 0;
    let newName = camelCase(name);

    if (registeredNames.includes(newName)) {
      newName += pascalCase(type);
    }

    while (registeredNames.includes(newName)) {
      newName = `${newName}${flag ? flag : ''}`;
      flag++;
      if (flag > 99) {
        throw new Error('Too many conflicting names');
      }
    }

    registeredNames.push(newName);

    const baseStyle: CSSProperties = {
      borderRadius: getBorderRadius(childNode),
      color: getFillColor(childNode),
      borderWidth: getBorderWidth(node),
      borderColor: borderColor,
      borderStyle: borderStyle,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    };

    const boxStyle: CSSProperties = {
      width: `${childNode.width}px`,
      height: `${childNode.height}px`,
    };

    const child: ComponentChildHbsData = {
      name: newName,
      figmaNodeType: type,
      style: computeStyle({ baseStyle, boxStyle, type }),
      defaultValue: computeDefaultValue(childNode),
    };

    return child;
  });
};

// const hasChildren = (node: SceneNode): node is SceneNode & ChildrenMixin => {
//   return (node as SceneNode & ChildrenMixin).children !== undefined;
// };

const mapFigmaNodeToReact = (type: BaseNode['type']) => {
  switch (type) {
    case 'TEXT':
      return 'string';
    default:
      return 'ReactElement | null';
  }
};

const getChildNodeProps = (
  components: ComponentHbsData[]
): ChildNodePropHbsData[] => {
  const nodes: Record<string, BaseNode['type']> = {};
  components.forEach((component) => {
    const { children } = component;
    if (!children.length) {
      return;
    }

    children.forEach((child) => {
      const { name, figmaNodeType } = child;
      nodes[name] = figmaNodeType;
    });
  });

  return Object.entries(nodes).map(([nodeName, nodeType]) => {
    const childNodeProp: ChildNodePropHbsData = {
      name: nodeName,
      figmaNodeType: nodeType,
      reactTsType: mapFigmaNodeToReact(nodeType),
    };
    return childNodeProp;
  });
};

// const getChildNodePropNames = (componentSetNode: ComponentSetNode) => {
//   const nodes: Record<string, BaseNode['type']> = {};
//   componentSetNode.children.forEach((componentNode) => {
//     if (!hasChildren(componentNode)) {
//       return;
//     }

//     const { children } = componentNode;

//     children.forEach((childNode) => {
//       nodes[childNode.name] = childNode.type;
//     });
//   });
//   return Object.entries(nodes).map(([nodeName, nodeType]) => ({
//     name: nodeName,
//     type: nodeType,
//   }));
// };

const getPadding = (node: SceneNode) => {
  if (!hasBaseFrameMixin(node)) {
    return '';
  }

  const {
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
  } = node;
  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
};

const getBaseFrameStyles = (node: SceneNode) => {
  if (!hasBaseFrameMixin(node)) {
    return { padding: '', gap: '' };
  }

  const padding = getPadding(node);

  const { itemSpacing } = node;
  const gap = `${itemSpacing}px`;

  // TODO calculate non flex
  const display = 'flex';
  const alignItems = 'center';

  return { padding, gap, display, alignItems };
};

const getComponentData = (componentSetNode: ComponentSetNode) => {
  const componentNodes = componentSetNode.children as ComponentNode[];
  const registeredNames = Object.keys(
    componentSetNode.variantGroupProperties
  ).map(camelCase);

  return componentNodes.map((node) => {
    const { borderColor, borderStyle } = getBorder(node);
    const { padding, gap, display, alignItems } = getBaseFrameStyles(node);

    const style: CSSProperties = {
      borderRadius: getBorderRadius(node),
      backgroundColor: getFillColor(node),
      borderWidth: getBorderWidth(node),
      borderColor,
      borderStyle,
      padding,
      gap,
      display,
      alignItems,
    };

    const map: ComponentHbsData = {
      serial: serializeProperties(node.variantProperties),
      style: JSON.stringify(style),
      children: getComponentChildren({
        node,
        registeredNames,
      }),
    };

    return map;
  });
};

// export const mapComponents = (componentNodes: ComponentNode[]) => {
//   const registeredNames= Object.keys(node.variantProperties ?? {}).map(
//     camelCase
//   )
// }

// export const mapPropNames = (
//   variantGroupProperties: VariantGroupProperties
// ) => {
//   return Object.entries(variantGroupProperties).map(
//     ([rawProperty, { values }]) => {
//       const property = camelCase(rawProperty);

//       if (valuesAreBooleans(values)) {
//         return {
//           property,
//           isBoolean: true,
//         };
//       } else if (valuesAreNumbers(values)) {
//         return {
//           property,
//           isNumber: true,
//         };
//       }

//       return {
//         property: camelCase(property),
//         isString: true,
//         hasDefaultValue: valuesHaveDefault(values),
//         values,
//       };
//     }
//   );
// };

const getVariantProps = (componentSetNode: ComponentSetNode) => {
  const { variantGroupProperties } = componentSetNode;

  return Object.entries(variantGroupProperties).map(
    ([rawPropertyName, { values }]) => {
      const name = camelCase(rawPropertyName);

      if (valuesAreBooleans(values)) {
        const variantProp: VariantPropHbsData = {
          name,
          reactTsType: 'boolean',
          required: false,
          defaultValue: 'false',
        };
        return variantProp;
      }

      if (valuesAreNumbers(values)) {
        const variantProp: VariantPropHbsData = {
          name,
          reactTsType: 'number',
          required: true,
          defaultValue: '',
        };
        return variantProp;
      }

      const hasDefault = valuesHaveDefault(values);

      const variantProp: VariantPropHbsData = {
        name,
        reactTsType: values.reduce((acc, value) => `${acc} | '${value}'`, ''),
        required: !hasDefault,
        defaultValue: hasDefault ? "'default'" : '',
      };

      return variantProp;
    }
  );
};

const isInstance = (s: string) => s === 'INSTANCE';
const isText = (s: string) => s === 'TEXT';

const generateCode = (componentSetNode: ComponentSetNode) => {
  const components = getComponentData(componentSetNode);
  const variantProps = getVariantProps(componentSetNode);
  const childNodeProps = getChildNodeProps(components);
  const name = pascalCase(componentSetNode.name);
  const hbsData: HbsData = {
    components,
    variantProps,
    childNodeProps,
    name,
  };
  console.log(hbsData);
  const delegate = handlebars.compile(reactTs);
  const fileContent = delegate(hbsData);

  return fileContent;
};

// const generateCode = (componentSetNode: ComponentSetNode) => {
//   handlebars.registerHelper({
//     camelCase,
//     pascalCase,
//     mapComponents,
//     mapPropNames,
//     getChildNodePropNames,
//     isInstance,
//     isText,
//   });
//   const delegate = handlebars.compile(reactTs);

//   const mappedComponents =
//     mapComponents(componentSetNode.children as ComponentNode[]) ?? [];
//   const childNodePropNames = getChildNodePropNames(mappedComponents);

//   const hbsData: HbsData = {
//     componentSetNode,
//     mappedComponents,
//     childNodePropNames,
//   };

//   const fileContent = delegate(hbsData, {
//     allowedProtoProperties: {
//       variantGroupProperties: true,
//       children: true,
//       name: true,
//     },
//   });

//   return fileContent;
// };

export default generateCode;
