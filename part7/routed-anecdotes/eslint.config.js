import globals from "globals";
import pluginJs from "@eslint/js";
import js from '@eslint/js'
import vitest from 'eslint-plugin-vitest'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ["**/*.js","**/*.jsx"],
    ignores: ["**/*.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
      }
    },
    plugins: {
      vitest,
      react
    },
    rules:{
      "eqeqeq": "error",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": [ "error", "never"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": [
        "error", {
           "before": true, "after": true 
          }
        ],
        "no-console": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
        "no-unused-vars": 0,
    }
  },
  {
    languageOptions: { 
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
]