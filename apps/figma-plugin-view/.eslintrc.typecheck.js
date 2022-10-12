const appTs = require('./tsconfig.app.json');
const configTs = require('./tsconfig.config.json');
const specTs = require('./tsconfig.spec.json');
const path = require('path');

module.exports = {
  extends: ['plugin:@nrwl/nx/react', '../../.eslintrc.typecheck.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: configTs.include,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.config.json'),
      },
    },
    {
      files: appTs.include,
      excludedFiles: appTs.exclude,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.app.json'),
      },
    },
    {
      files: specTs.include,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.spec.json'),
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
