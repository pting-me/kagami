const configTs = require('./tsconfig.config.json');
const libTs = require('./tsconfig.lib.json');
const specTs = require('./tsconfig.spec.json');
const path = require('path');

module.exports = {
  extends: ['plugin:@nrwl/nx/react', '../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: configTs.include,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.config.json'),
      },
    },
    {
      files: libTs.include,
      excludedFiles: libTs.exclude,
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.lib.json'),
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
      rules: {
        '@typescript-eslint/no-unsafe-assignment': ['warn'],
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
