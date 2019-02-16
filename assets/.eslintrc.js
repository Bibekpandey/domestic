module.exports = {
    extends: "airbnb",
    parser: "babel-eslint",

    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module"
    },

    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        indent: ["error", 4],
    },
};
