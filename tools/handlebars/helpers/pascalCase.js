const camelCase = require('lodash.camelcase');
const capitalize = require('lodash.capitalize');
const pascalCase = function () {};

pascalCase.register = function (Handlebars) {
  Handlebars.registerHelper('pascalCase', function (text) {
    return capitalize(camelCase(text));
  });
};

module.exports = pascalCase;
