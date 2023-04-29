/** @type {import('eslint').Linter.ConfigOverride} */
module.exports = {
  overrides: [
    {
      files: ["src/**/*.ts"],
      env: { browser: true, es2020: true },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    {
      files: ["**/*.{js,cjs,mjs}"],
      env: { node: true, es2020: true },
      extends: ["eslint:recommended"],
    },
  ],
};
