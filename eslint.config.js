const js = require("@eslint/js")
const jest = require("eslint-plugin-jest")
const globals = require("globals")

module.exports = [
    js.configs.recommended,
    {
        plugins: {
            jest: jest
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...jest.environments.globals.globals
            }
        }
    }
]