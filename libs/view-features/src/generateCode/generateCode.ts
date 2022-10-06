import handlebars from 'handlebars';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import prettier from 'prettier';
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

export const mapComponents = (componentNodes: ComponentNode[]) =>
  componentNodes.map((node) => ({
    serialized: serializeProperties(node.variantProperties),
  }));

export const mapProperties = (
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

export const mapValues = (values: string[]) =>
  values.map((value) => camelCase(value));

const generateCode = (data: ComponentSetNode) => {
  handlebars.registerHelper({
    camelCase,
    pascalCase,
    mapComponents,
    mapProperties,
    mapValues,
  });
  const delegate = handlebars.compile(reactTs);

  return prettier.format(delegate(data), {
    singleQuote: true,
    parser: 'typescript',
    plugins: [parserTypescript],
  });
};

export default generateCode;
