import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js","**/*.jsx"],
    ignores: ["**/*.config.js"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
      }
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
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
        "no-unused-vars": 0  
    }
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
];