import airbnbBase from 'eslint-config-airbnb-base'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        node: true,
      },
    },
    rules: {
      ...airbnbBase.rules,
      ...prettier.rules,

      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      eqeqeq: 'error',
    },
  },
]
