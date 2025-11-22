import base from './base';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
  ...base,
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
