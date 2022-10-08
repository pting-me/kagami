import handlebars from 'handlebars';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { format } from 'prettier';
import parserTypescript from 'prettier/parser-typescript';

const reactTs = `
import { CSSProperties, ComponentPropsWithRef, FC, ReactNode } from 'react';

interface Props extends ComponentPropsWithRef<'div'> {
{{#each (mapPropNames this.variantGroupProperties)}}
  {{#if this.isBoolean}}
    {{this.property}}?: boolean;
  {{/if}}
  {{#if this.isNumber}}
    {{this.property}}: number;
  {{/if}}
  {{#if this.isString}}
    {{this.property}}{{#if this.hasDefaultValue}}?{{/if}}:
    {{#each this.values}}
    | '{{camelCase this}}'
    {{/each}};
  {{/if}}
{{/each}}
}

type VariantProperties = {
  [property: string]: unknown;
} | null;

const serializeProperties = (variantProperties: VariantProperties) => {
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
      \`\${str.toLowerCase()}--\${currKey.toLowerCase()}-\${String(currVal).toLowerCase()}\`,
    ''
  );
};

interface ComputedProps {
  style?: CSSProperties;
  children?: ReactNode;
}

const getProps = (variantProperties: VariantProperties): ComputedProps => {
  const serialized = serializeProperties(variantProperties);
  switch (serialized) {
    {{#each (mapComponents this.children)}}
    case '{{this.serialized}}': 
      return {
        style: {
          borderRadius: '{{this.borderRadius}}',
          backgroundColor: '{{this.backgroundColor}}',
          borderWidth: '{{this.borderWidth}}',
          borderColor: '{{this.borderColor}}',
          borderStyle: '{{this.borderStyle}}',
          padding: '{{this.padding}}',
        },
        children: <div></div>,
      };
    {{/each}}
    default:
      return {};
  }
};

const {{pascalCase this.name}}: FC<Props> = (props: Props) => {
  const {
    children: childrenOverride,
    {{#each (mapPropNames this.variantGroupProperties)}}
      {{this.property}}
        {{#if this.isBoolean}}=false{{/if}}
        {{#if this.hasDefaultValue}}='default'{{/if}}
      ,
    {{/each}}style: styleOverride,
    ...rest
  } = props;

  const { style, children } = getProps({
    size,
    variant,
    icon,
  });

  return (
    <div style={ { ...style, ...styleOverride } } {...rest}>
      {childrenOverride}
    </div>
  );
};

export default {{pascalCase this.name}};
export type { Props };
`;

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
    color: { r = 0, g = 0, b = 0 },
    opacity = 1,
  } = firstBackground;

  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(
    b * 255
  )},${opacity ?? 1})`;
};

const getBorderWidth = (componentNode: ComponentNode) => {
  const {
    strokeTopWeight = 0,
    strokeRightWeight = 0,
    strokeBottomWeight = 0,
    strokeLeftWeight = 0,
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

const getPadding = (componentNode: ComponentNode) => {
  const {
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
  } = componentNode;
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

  const fileContent = delegate(data, {
    allowedProtoProperties: {
      variantGroupProperties: true,
      children: true,
      name: true,
    },
  });

  return fileContent;

  // return format(delegate(data), {
  //   singleQuote: true,
  //   parser: 'typescript',
  //   plugins: [parserTypescript],
  // });
};

export default generateCode;
