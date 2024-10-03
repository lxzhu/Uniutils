const path = require('path')
module.exports = {
    mode: 'development',
    target: "node",
    entry: {
        "cut": "./src/cut.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    }
}