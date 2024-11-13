const js = require("@eslint/js")
const jest = require("eslint-plugin-jest")
const globals = require("globals")
const depend = require("eslint-plugin-depend")

module.exports = [
    js.configs.recommended,
    depend.configs["flat/recommended"],
    {
        plugins: {
            jest: jest
        },
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...jest.environments.globals.globals
            }
        }
    }
]