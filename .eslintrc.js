module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true
  },
  extends: [
    "@vue/typescript/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    // "plugin:vue-pug-sfc/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "@vue/prettier"
  ],
  plugins: [
    // "vue",
    "prettier"
    // "@typescript-eslint"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    // "vue-pug-sfc/this-in-template": "warn",
    "no-extra-boolean-cast": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "vue/script-setup-uses-vars": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
