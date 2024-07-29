module.exports = {
  extends: [
    "plugin:react/recommended",
    "next/core-web-vitals",
    "plugin:import/recommended",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint", "import"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/no-unknown-property": [
      "error",
      { ignore: ["css", "global", "jsx"] },
    ],
    "import/no-named-as-default": "off",
    "import/first": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "external",
          "builtin",
          "index",
          ["sibling", "parent"],
          "internal",
          "object",
          "type",
        ],
      },
    ],
  },
};
