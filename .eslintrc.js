module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  root: true,
  env: {
    es6: true,
    browser: false,
    jest: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
  ignorePatterns: ['index.js', 'index.d.ts'],
};
