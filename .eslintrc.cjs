module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  // 繼承套件的規則設定
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  // parser 解析依賴設定
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'react'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // 確保即使沒有 type 定義也能解析
        project: './tsconfig.json', // 指定你的 tsconfig.json 路徑
      },
      node: true,
    },
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'dayjs',
            message: '請使用封裝好的 @/utils/dateHelper 來引用 Dayjs 型別。',
          },
        ],
      },
    ],
    // 需在這邊加入你的ESLint設定
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'never',
        prev: 'export',
        next: 'export',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/order': [
      'warn',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
        warnOnUnassignedImports: true,
      },
    ],
    'import/newline-after-import': 'warn',
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        multiline: 'last',
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: false,
        locale: 'auto',
      },
    ],
  },
  ignorePatterns: ['ckeditor5/**'],
  overrides: [
    {
      files: ['*.cjs'], // 針對特定資料夾和其所有子檔案
      env: {
        node: true, // 設定為 Node.js 環境
      },
      parserOptions: {
        sourceType: 'script', // 使用 'script' 而不是 'module' 來支援 CommonJS
      },
      rules: {},
    },
  ],
};
