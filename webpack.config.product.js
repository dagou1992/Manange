const webpack = require('webpack');
const path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './app/index.js',
        vendor: ['react','react-dom','react-router',]
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, '../../../../paysdk-manager-1.1-deploy/src/main/resources/public/assets')
    },
    devServer:{
        inline: true,
        proxy: {
            "/api/*": {
                target:"http://192.168.30.148:8090",   //   , "http://192.168.21.55:8080"
                pathRewrite: {"^/api" : ""}
            },
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            title: 'demo',
            template: 'index.html', // 模板路径,
            filename: '../index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'] ,
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "style": 'css'
                        }]
                    ]}
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"//感叹号的作用在于使同一文件能够使用不同类型的loader
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.json', '.jsx','less'],
        alias: {
            config: `${srcPathAbsolute()}/config/dist.js`
        }
    }
};

function srcPathAbsolute() {
    return path.resolve('./app');
}