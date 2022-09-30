const camelcase = require('lodash.camelcase');
const upperfirst = require('lodash.upperfirst');
const componentHelpers = function () {};

componentHelpers.register = function (Handlebars) {
  Handlebars.registerHelper('camelcase', function (text) {
    return camelcase(text);
  });

  Handlebars.registerHelper('pascalcase', function (text) {
    return upperfirst(camelcase(text));
  });

  Handlebars.registerHelper('mapProperties', function (variantGroupProperties) {
    return Object.entries(variantGroupProperties).map(
      ([rawProperty, { values }]) => {
        const property = camelcase(rawProperty);
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
          property: camelcase(property),
          isString: true,
          values,
        };
      }
    );
  });

  Handlebars.registerHelper('mapValues', function (values) {
    return Object.entries(values).map((value) => camelcase(value));
  });
};

module.exports = componentHelpers;
