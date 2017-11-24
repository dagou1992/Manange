const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './app/index.js',
        vendor: ['react', 'react-dom', 'react-router',]
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, 'dist/assets')
    },
    devServer: {
        inline: true,
        port: 3008,
        proxy: {
            "/api/*": {
                target: "http://47.88.191.81:8085",   //   , "http://47.88.191.81:8085  192.168.3.105:8080
                pathRewrite: {"^/api": ""}
            },
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            template: 'index.html', // 模板路径,
            filename: '../index.html'
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "style": 'css'
                        }]
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"//感叹号的作用在于使同一文件能够使用不同类型的loader
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.json', '.jsx', 'less'],
        alias: {
            config: `${srcPathAbsolute()}/config/dev.js`
        }
    }
};

function srcPathAbsolute() {
    return path.resolve('./app');
}
