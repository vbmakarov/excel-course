module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'no-debugger': 'off',
    'linebreak-style': ['error', 'windows']
  },
  plugins: ['jest'],
  extends: ['eslint:recommended', 'google'],
};
