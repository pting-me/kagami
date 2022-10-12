const storybookTs = require('./tsconfig.json');
const path = require('path');

module.exports = {
  extends: ['plugin:@nrwl/nx/react', '../../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: storybookTs.include.map((dir) => `./${dir}`),
      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
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
