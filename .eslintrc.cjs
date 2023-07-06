module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    // 0 - "off"
    // 1 - "warn"
    // 2 - "error"
    'semi': [2, 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'MemberExpression': 1,
      'flatTernaryExpressions': false,
    }],
    'vue/no-v-html': 0,
    'vue/valid-v-on': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/v-slot-style': 0,
    'vue/html-self-closing': 2,
    'vue/new-line-between-multi-line-property': 2,
    'vue/max-attributes-per-line': ['error', {
      'singleline': 4,
    }],
    'vue/no-multiple-template-root': 0,
    'vue/require-default-prop': 0,
    'vue/no-mutating-props': 0, // TODO: looks like it useful, prevent and fix warnings in future
    'vue/html-indent': ['warn', 2],
    'vue/no-v-text-v-html-on-component': 0,
    'vue/valid-v-slot': ['error', { 'allowModifiers': true }],
    'vue/multi-word-component-names': 1,
    'vue/attributes-order': [2, {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
      ],
      'alphabetical': false,
    }],
    'vue/match-component-file-name': [1, {
      'extensions': ['vue', 'js'],
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': true,
    }],
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
