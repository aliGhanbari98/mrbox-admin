module.exports = {
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    // TODO:
    // 'prettier/@typescript-eslint',
    'plugin:react/recommended',
    // 'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // indent: ['error', 2, { SwitchCase: 1 }],
    // quotes: ['error', 'single'],
    // semi: ['error', 'never'],
    'linebreak-style': 0,
    'prettier/prettier': 'off',
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'warn',
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'react/jsx-wrap-multilines': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['assets', './assets'],
          ['components', './components'],
          ['configs', './configs'],
          ['redux', './redux'],
        ],
        extensions: ['.js', '.jsx', '.scss', '.css'],
      },
    },
  },
}
