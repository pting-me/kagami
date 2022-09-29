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
};

module.exports = componentHelpers;
