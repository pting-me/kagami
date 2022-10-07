import handlebars from 'handlebars';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { format } from 'prettier';
import parserTypescript from 'prettier/parser-typescript';

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

const getBorderRadius = (componentNode: ComponentNode) => {
  const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius } =
    componentNode;
  return `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`;
};

const getBackgroundColor = (componentNode: ComponentNode) => {
  if (typeof componentNode.fills === 'symbol') {
    return '';
  }

  const visibleBackgrounds = (componentNode.fills ?? []).filter(
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
    color: { r, g, b },
    opacity,
  } = firstBackground;

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${opacity ?? 1})`;
};

const getBorderWidth = (componentNode: ComponentNode) => {
  const {
    strokeTopWeight,
    strokeRightWeight,
    strokeBottomWeight,
    strokeLeftWeight,
  } = componentNode;
  return `${strokeTopWeight}px ${strokeRightWeight}px ${strokeBottomWeight}px ${strokeLeftWeight}px`;
};

const getBorder = (componentNode: ComponentNode) => {
  const visibleStrokes = (componentNode.strokes ?? []).filter(
    ({ visible }) => visible
  );
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
    color: { r, g, b },
    opacity,
  } = firstStroke;

  return {
    style: 'solid',
    color: `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
      b * 255
    )},${opacity ?? 1});`,
  };
};

const getPadding = (componentNode: ComponentNode) => {
  const { paddingTop, paddingRight, paddingBottom, paddingLeft } =
    componentNode;
  return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
};

export const mapComponents = (componentNodes: ComponentNode[]) =>
  componentNodes.map((node) => {
    const { color, style } = getBorder(node);

    return {
      serialized: serializeProperties(node.variantProperties),
      borderRadius: getBorderRadius(node),
      backgroundColor: getBackgroundColor(node),
      borderWidth: getBorderWidth(node),
      borderColor: color,
      borderStyle: style,
      padding: getPadding(node),
    };
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

const generateCode = (data: ComponentSetNode) => {
  handlebars.registerHelper({
    camelCase,
    pascalCase,
    mapComponents,
    mapPropNames,
  });
  const delegate = handlebars.compile(reactTs);

  return format(delegate(data), {
    singleQuote: true,
    parser: 'typescript',
    plugins: [parserTypescript],
  });
};

export default generateCode;
