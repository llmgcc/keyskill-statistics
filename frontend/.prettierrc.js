/** @type {import('prettier').Config} */
export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  importOrder: [
    '^react$',
    '^react-dom$',
    '^@?\\w',
    '',
    '^@/(types|interfaces)(/.*)?$',
    '^@/(config|constants)(/.*)?$',
    '^@/(hooks|store)(/.*)?$',
    '^@/components/ui(/.*)?$',
    '^@/components(/.*)?$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
