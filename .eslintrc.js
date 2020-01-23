module.exports = {
  extends: ['byurhan'],
  rules: {
    'no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        semi: false,
        tabWidth: 2,
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
        jsxBracketSameLine: false,
      },
    ],
  },
}
