module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'jsx-quotes':['warn', 'prefer-single'],
    'indent': ['warn', 2, {'SwitchCase': 1}],
    'linebreak-style': [
      'warn',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    'no-non-null-assertion': 'off',
    'react/prop-types':0,

  },
  'settings': {
    'react':{
      'version': 'detect',
    }
  }
};
