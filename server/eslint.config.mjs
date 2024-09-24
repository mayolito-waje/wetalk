/* eslint no-underscore-dangle: 0 */
/* eslint @typescript-eslint/naming-convention: 0 */

import globals from 'globals';
import pluginJs from '@eslint/js';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import { fixupConfigRules } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...fixupConfigRules(compat.extends('airbnb-base')),
  ...compat.extends('airbnb-typescript/base'),
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsConfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'import/no-extraneous-dependencies': 0,
      'no-console': 0,
      'object-curly-newline': 0,
    },
  },
];
