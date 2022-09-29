const lodashCamelCase = require('lodash.camelcase');
const camelCase = function () {};

camelCase.register = function (Handlebars) {
  Handlebars.registerHelper('camelCase', function (text) {
    return lodashCamelCase(text);
  });
};

module.exports = camelCase;
