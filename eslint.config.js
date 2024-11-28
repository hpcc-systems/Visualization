import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import pluginReactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: [
            "**/*.{js,mjs,cjs,ts,jsx,tsx}"
        ]
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                "dojo": "readonly",
                "dijit": "readonly",
                "dojoConfig": "readonly"
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    // pluginReact.configs.flat.recommended,
    {
        plugins: {
            // "react-hooks": pluginReactHooks,
        },
        settings: {
            react: {
                version: "17"
            }
        },
        rules: {
            // ...pluginReactHooks.configs.recommended.rules,
            "no-redeclare": "off",
            "no-empty": "off",
            "no-empty-pattern": "off",
            "no-constant-condition": "off",
            "no-case-declarations": "off",
            "no-prototype-builtins": "off",
            "no-unused-vars": "off",
            "no-useless-escape": "off",
            "no-unexpected-multiline": "off",
            "no-extra-boolean-cast": "off",
            "no-self-assign": "off",
            "no-multiple-empty-lines": [
                "error", {
                    max: 1
                }
            ],
            "no-console": [1, {
                "allow": ["info", "warn", "error"]
            }],
            "func-call-spacing": ["error", "never"],
            "space-before-function-paren": ["error", {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }],
            "comma-spacing": [
                "error", {
                    "before": false,
                    "after": true
                }
            ],

            "prefer-rest-params": "off",
            "prefer-spread": "off",

            "semi": ["error", "always"],
            "quotes": [
                "error",
                "double", {
                    "avoidEscape": true
                }
            ],

            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-this-alias": "off",
            // "@typescript-eslint/ban-types": [
            //     "error",
            //     {
            //         "types": {
            //             // add a custom message, AND tell the plugin how to fix it
            //             "String": {
            //                 "message": "Use string instead",
            //                 "fixWith": "string"
            //             },

            //             "{}": {
            //                 "message": "Use object instead",
            //                 "fixWith": "object"
            //             },

            //             "object": false
            //         }
            //     }
            // ],
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-var-require": "off",
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            // "react-hooks/exhaustive-deps": "warn"
        }
    }
];