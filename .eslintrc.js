module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  // Just disable all of these, they're not useful. Prettier will sort out the syntax
  rules: {
    'vue/no-use-v-if-with-v-for': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'arrow-parens': ['error' 'as-needed',
    semi: 0,
    indent: 0,
    'space-before-function-paren': 0,
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
    'no-tabs': 0,
    'spaced-comment': 0,
  },
};
