import handlebars from 'handlebars';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

import reactTs from './reactTs.hbs?raw';

export const pascalCase = (text: string) => upperFirst(camelCase(text));

/**
 * Copied from plugin-api under ComponentSetNode
 */
interface VariantGroupProperties {
  [property: string]: { values: string[] };
}

type VariantProperties = {
  [property: string]: string;
} | null;

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

const getBackgroundColor = (node: SceneNode) => {
  if (!hasFillsMixin(node) || typeof node.fills === 'symbol') {
    return '';
  }

  const visibleBackgrounds = (node.fills ?? []).filter(
    ({ visible }) => visible
  );
  if (visibleBackgrounds.length === 0) {
    return '';
  }

  // TODO add support for multiple layers
  // TODO add support for other background types
  const firstBackground = visibleBackgrounds[0];
  if (firstBackground.type !== 'SOLID') {
    return '';
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstBackground;

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
    return { style: '', color: '' };
  }

  const visibleStrokes = (node.strokes ?? []).filter(({ visible }) => visible);
  if (visibleStrokes.length === 0) {
    return { style: 'none', color: 'initial' };
  }

  // TODO add support for multiple layers
  // TODO add support for other background types(?)
  const firstStroke = visibleStrokes[0];
  if (firstStroke.type !== 'SOLID') {
    return { style: 'none', color: 'initial' };
  }

  const {
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstStroke;

  return {
    style: 'solid',
    color: `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
      b * 255
    )},${opacity ?? 1});`,
  };
};

const hasBaseFrameMixin = (
  node: SceneNode
): node is SceneNode & BaseFrameMixin => {
  return (node as SceneNode & BaseFrameMixin).paddingTop !== undefined;
};

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
    typeof node.fontName === 'symbol' ? '' : node.fontName.family;

  const fontSize = typeof node.fontSize === 'symbol' ? '' : node.fontSize;
  const fontWeight = typeof node.fontWeight === 'symbol' ? '' : node.fontWeight;

  const lineHeight = getLineHeight(node.lineHeight);

  return { fontFamily, fontSize, fontWeight, lineHeight };
};

interface GetChildNodesOptions {
  node: ComponentNode;
  registeredNames: string[];
}

const getChildNodes = (options: GetChildNodesOptions) => {
  const { node, registeredNames: baseRegisteredNames } = options;
  const { children } = node;

  if (!children?.length) {
    return null;
  }

  const registeredNames = baseRegisteredNames.map(camelCase);

  return children.map((childNode) => {
    const { name, type } = childNode;
    const { color, style } = getBorder(childNode);
    const { fontFamily, fontSize, fontWeight, lineHeight } = getFont(childNode);

    // Get rid of property name conflicts
    let flag = 0;
    let newName = camelCase(name);

    if (registeredNames.includes(newName)) {
      newName += 'Node';
    }

    while (registeredNames.includes(newName)) {
      newName = `${newName}${flag ? flag : ''}`;
      flag++;
      if (flag > 99) {
        throw new Error('Too many conflicting names');
      }
    }

    registeredNames.push(newName);

    return {
      type,
      name: newName,
      borderRadius: getBorderRadius(childNode),
      backgroundColor: getBackgroundColor(childNode),
      borderWidth: getBorderWidth(node),
      borderColor: color,
      borderStyle: style,
      padding: getPadding(node),
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    };
  });
};

// const hasChildren = (node: SceneNode): node is SceneNode & ChildrenMixin => {
//   return (node as SceneNode & ChildrenMixin).children !== undefined;
// };

const getChildNodePropNames = (
  mappedComponents: ReturnType<typeof mapComponents>
) => {
  const nodes: Record<string, BaseNode['type']> = {};
  mappedComponents.forEach((mappedComponent) => {
    const { children } = mappedComponent;
    if (!children) {
      return null;
    }

    children.forEach((child) => {
      const { name, type } = child;
      nodes[name] = type;
    });
  });
  return Object.entries(nodes).map(([nodeName, nodeType]) => ({
    name: nodeName,
    type: nodeType,
  }));
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

export const mapComponents = (componentNodes: ComponentNode[]) =>
  componentNodes.map((node) => {
    const { color, style } = getBorder(node);

    const map = {
      serialized: serializeProperties(node.variantProperties),
      borderRadius: getBorderRadius(node),
      backgroundColor: getBackgroundColor(node),
      borderWidth: getBorderWidth(node),
      borderColor: color,
      borderStyle: style,
      padding: getPadding(node),
      children: getChildNodes({
        node,
        registeredNames: Object.keys(node.variantProperties ?? {}).map(
          camelCase
        ),
      }),
    };

    return map;
  });

export const mapPropNames = (
  variantGroupProperties: VariantGroupProperties
) => {
  return Object.entries(variantGroupProperties).map(
    ([rawProperty, { values }]) => {
      const property = camelCase(rawProperty);

      if (valuesAreBooleans(values)) {
        return {
          property,
          isBoolean: true,
        };
      } else if (valuesAreNumbers(values)) {
        return {
          property,
          isNumber: true,
        };
      }

      return {
        property: camelCase(property),
        isString: true,
        hasDefaultValue: valuesHaveDefault(values),
        values,
      };
    }
  );
};

const isInstance = (s: string) => s === 'INSTANCE';
const isText = (s: string) => s === 'TEXT';

interface HbsData {
  componentSetNode: ComponentSetNode;
  mappedComponents: ReturnType<typeof mapComponents>;
  childNodePropNames: ReturnType<typeof getChildNodePropNames>;
}

const generateCode = (componentSetNode: ComponentSetNode) => {
  handlebars.registerHelper({
    camelCase,
    pascalCase,
    mapComponents,
    mapPropNames,
    getChildNodePropNames,
    isInstance,
    isText,
  });
  const delegate = handlebars.compile(reactTs);

  const mappedComponents =
    mapComponents(componentSetNode.children as ComponentNode[]) ?? [];
  const childNodePropNames = getChildNodePropNames(mappedComponents);

  const hbsData: HbsData = {
    componentSetNode,
    mappedComponents,
    childNodePropNames,
  };

  const fileContent = delegate(hbsData, {
    allowedProtoProperties: {
      variantGroupProperties: true,
      children: true,
      name: true,
    },
  });

  return fileContent;
};

export default generateCode;
