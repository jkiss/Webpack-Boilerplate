/*
 * @Author: Nokey
 * @Date: 2017-02-24 14:16:31
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-10-30 16:44:32
 */
'use strict';

const webpack = require('webpack')
const path = require('path')
const config = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const poststylus = require('poststylus')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
const PUBLIC_PATH = config.public_path

let NEW_PLUGINS
if(config.analyse_bundle){
    NEW_PLUGINS = PLUGINS.concat([ new BundleAnalyzerPlugin() ])
}else{
    NEW_PLUGINS = PLUGINS
}

module.exports = {
    mode: 'production',

    optimization: OPTIMIZITION,

    // dectool should be false if env is production!!!
    devtool: false, // false || 'cheap-eval-source-map'

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
                        options: {
                            limit: 1024,
                            name: '/media/[hash].[ext]'
                        }
                    }
                ]
            },
    
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '/fonts/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
    
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[hash:base64:12]'
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

    plugins: NEW_PLUGINS.concat([
        new ImageminPlugin({
            // disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: '60-65'
            },
            plugins: [
                imageminMozjpeg({
                    quality: 60,
                    progressive: true
                })
            ]
        })
    ]),

    resolve: RESOLVE
};