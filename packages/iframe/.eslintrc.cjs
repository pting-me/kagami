/** @type {import('eslint').Linter.ConfigOverride} */
module.exports = {
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      env: { browser: true, es2020: true },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      plugins: ["react-refresh"],
      rules: {
        "react-refresh/only-export-components": "warn",
        "@typescript-eslint/no-empty-interface": [
          "error",
          {
            allowSingleExtends: true,
          },
        ],
      },
    },
    {
      files: ["**/*.{js,cjs,mjs}"],
      env: { node: true, es2020: true },
      extends: ["eslint:recommended"],
    },
  ],
};
