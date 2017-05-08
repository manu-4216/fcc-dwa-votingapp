var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: ROOT_PATH + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
})


// In webpack.config.js
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: path.resolve(ROOT_PATH, 'src', 'index.js'),
    output: {
        //path: ROOT_PATH + '/dist',
        path: ROOT_PATH,
        filename: "index_bundle.js"
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.(png|jpg|)$/,
                loader: 'url-loader?limit=200000'
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}
