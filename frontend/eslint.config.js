import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommended,
    eslintReact.configs['recommended-typescript'],
    prettier,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@eslint-react/no-missing-key': 'warn',
  },
});
