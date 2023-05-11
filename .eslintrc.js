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
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  ignorePatterns: ['index.js', 'index.d.ts'],
};
