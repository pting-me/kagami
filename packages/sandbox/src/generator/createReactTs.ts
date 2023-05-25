import { TemplateData } from "./types";

export function createReactTs(data: TemplateData) {
  const {
    childNodeProps,
    variantProps,
    components,
    name,
    isForwardRef,
    elementTypeName,
    tagName,
  } = data;

  return `import {
  CSSProperties,
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
  ${isForwardRef ? "forwardRef" : "FC"},
} from 'react';

// START COMMON SECTION
// This section is the same for all properties.
// You may want to put these in a separate file and import them.

type VariantProperties = {
  [property: string]: unknown;
} | null;

interface ComputedProps {
  style?: CSSProperties;
  children?: ReactNode;
}

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

// END COMMON SECTION

interface NodeProps {
${childNodeProps
  .map((c) => {
    return c;
  })
  .map(({ name, reactTsType }) => `  ${name}?: ${reactTsType};`)
  .join("\n")}
}

interface Props extends ComponentPropsWithRef<'${tagName}'>, NodeProps {
${variantProps
  .map(({ name, required, reactTsType }) => {
    return `  ${name}${required ? "" : "?"}: ${reactTsType};`;
  })
  .join("\n")}
}

interface GetPropsOptions {
  variantProperties: VariantProperties;
  nodeProps: NodeProps;
}

const getProps = (options: GetPropsOptions): ComputedProps => {
  const { variantProperties, nodeProps } = options;
  const {
${childNodeProps.map(({ name }) => `    ${name},`).join("\n")}
  } = nodeProps;

  const serialized = serializeProperties(variantProperties);
  switch (serialized) {
${components
  .map(({ serial, style, shouldRenderInFragment, children }) => {
    return `
    case '${serial}':
      return {
        style: ${style},
        children: ${shouldRenderInFragment ? "<>" : ""}
${children
  .map(({ style: childStyle, name, defaultValue }) => {
    return `          <div style={ ${childStyle} }>
            { ${name}${defaultValue ? ` ?? ${defaultValue}` : ""} }
          </div>`;
  })
  .join("\n")}
${shouldRenderInFragment ? "          </>" : ""}
      };`;
  })
  .join("\n")}
    default:
      return {};
  }
};

${
  isForwardRef
    ? `const ${name}= forwardRef<${elementTypeName}, Props>((props: Props, ref) => {`
    : `const ${name}: FC<Props> = (props: Props) => {`
}
  const {
    children: childrenOverride,
${variantProps
  .map(({ name, defaultValue }) => {
    return `    ${name}${defaultValue ? `=${defaultValue}` : ""},`;
  })
  .join("\n")}
${childNodeProps.map(({ name }) => `    ${name},`).join("\n")}
    style: styleOverride,
    ...rest
  } = props;

  const { style, children } = getProps({
    variantProperties: {
    ${variantProps.map(({ name }) => `${name},`).join("\n")}
    },
    nodeProps: {
    ${childNodeProps.map(({ name }) => `${name},`).join("\n")}
    },
  });

  return (
    <${tagName} style={ { ...style, ...styleOverride } } {...rest}${
    isForwardRef ? " ref={ref}" : ""
  }>
      {childrenOverride ?? children}
    </${tagName}>
  );
}${isForwardRef ? ")" : ""};

export default ${name};
export { ${name} };
export type { Props as ${name}Props };
`;
}
