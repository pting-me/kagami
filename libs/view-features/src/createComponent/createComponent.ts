import handlebars from 'handlebars';
import componentTemplate from './component.hbs?raw';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

const pascalCase = (text: string) => upperFirst(camelCase(text));

/**
 * Copied from plugin-api under ComponentSetNode
 */
interface VariantGroupProperties {
  [property: string]: { values: string[] };
}

const mapProperties = (variantGroupProperties: VariantGroupProperties) => {
  return Object.entries(variantGroupProperties).map(
    ([rawProperty, { values }]) => {
      const property = camelCase(rawProperty);
      const firstValue = values[0];

      if (firstValue === 'true' || firstValue === 'false') {
        return {
          property,
          isBoolean: true,
        };
      } else if (!Number.isNaN(Number(firstValue))) {
        return {
          property,
          isNumber: true,
        };
      }

      return {
        property: camelCase(property),
        isString: true,
        values,
      };
    }
  );
};

const mapValues = (values: string[]) => values.map((value) => camelCase(value));

const createComponent = (data: ComponentSetNode) => {
  handlebars.registerHelper({
    camelCase,
    pascalCase,
    mapProperties,
    mapValues,
  });
  const delegate = handlebars.compile(componentTemplate);

  return delegate(data);
};

export default createComponent;
