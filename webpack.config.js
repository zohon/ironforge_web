module.exports = {
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' pour webpack 1
        }
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
};