/*
 * @Author: Nokey
 * @Date: 2017-02-24 14:16:31
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-10-30 16:17:44
 */
'use strict';

const webpack = require('webpack')
const path = require('path')
const config = require('./config')
const poststylus = require('poststylus')

/**
 * Common config that can be used in dev & prod environment
 */
const ENTRY = require('./webpack/entry')
const RULES = require('./webpack/rules').rules
const PLUGINS = require('./webpack/plugins').plugins
const RESOLVE = require('./webpack/resolve')
const OPTIMIZITION = require('./webpack/optimization')

/**
 * Config
 */
const PORT = config.port
const PUBLIC_PATH = config.public_path

/**
 * Dev plugins
 */
// const openBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    mode: 'development',

    optimization: OPTIMIZITION,

    // dectool should be false if env is production!!!
    devtool: 'cheap-eval-source-map', // false || 'cheap-eval-source-map'

    // devServer
    devServer: {
        port: PORT,
        contentBase: path.join(__dirname, './build'),
        hot: true
    },

    entry: ENTRY,

    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle/[name].js",
        publicPath: PUBLIC_PATH
    },

    module: {
        rules: RULES.concat([
            {
                test: /\.(gif|png|jpg|mp3|mp4|obj|mtl|glb)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 1024,
                            name: 'media/[hash].[ext]'
                        }
                    }
                ]
            },
    
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 1024,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
    
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]__[hash:base64:10]'
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            use: [
                                poststylus([ 'autoprefixer', 'rucksack-css' ])
                            ]
                        }
                    }
                ]
            }
        ])
    },

    plugins: PLUGINS.concat([
        new webpack.HotModuleReplacementPlugin()
    ]),

    resolve: RESOLVE
};