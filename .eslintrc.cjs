module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended", "@nuxt/eslint-config"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
