/**
 * Author: Mr.B
 * Date: 2017/7/7-18:14
 * Last Modified by: Nokey
 */
'use strict';

const path = require('path')
const config = require('../config')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            // warnings: false,
            // ie8: false,
            compress: {
                warnings: false
            }
        })

        /**
         * CommonChunksPlugin will now extract all the common modules from vendor and node_modules
         */
        ,new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'bundle/[name].js',
            minChunks: function (module) {
                var isNpmPlugin = module.context && module.context.indexOf('node_modules') !== -1;
                var isVendorPlugin = module.context && module.context.indexOf('vendor') !== -1;
                return isNpmPlugin || isVendorPlugin;
            }
        })

        ,new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        })

        // Extract css file for every entry files
        ,new ExtractTextPlugin('bundle/[name].css')

        // Generate HTML file to 'output' folder, each of html need a plugin
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'new-era-for-china.html',
            template: path.resolve(__dirname, '../src/html/page1.ejs'),
            _entry: 'page1.index',  // 用于多页判断
            title: config.page1.title,
            desc: config.page1.desc,
            image: config.page1.image,
            url: config.page1.url,
            thumb: config.page1.thumb
        })
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'moments-on-world-stage.html',
            template: path.resolve(__dirname, '../src/html/page2.ejs'),
            _entry: 'page2.index',  // 用于多页判断
            title: config.page2.title,
            desc: config.page2.desc,
            image: config.page2.image,
            url: config.page2.url,
            thumb: config.page2.thumb
        })
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'tackled-curruption.html',
            template: path.resolve(__dirname, '../src/html/page3.ejs'),
            _entry: 'page3.index',  // 用于多页判断
            title: config.page3.title,
            desc: config.page3.desc,
            image: config.page3.image,
            url: config.page3.url,
            thumb: config.page3.thumb
        })
        ,new htmlWebpackPlugin({
            inject: false,
            filename: 'cutting-red-tape.html',
            template: path.resolve(__dirname, '../src/html/page4.ejs'),
            _entry: 'page4.index',  // 用于多页判断
            title: config.page4.title,
            desc: config.page4.desc,
            image: config.page4.image,
            url: config.page4.url,
            thumb: config.page4.thumb
        })

        // Automatically loaded modules when identifier is used as free variable in a module
        ,new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            '_': 'lodash',
            'PropTypes': 'prop-types'
        })

        // Copy static files to 'config.output' folder
        ,new copyWebpackPlugin([
            {
                from: '**/*.*',
                to: 'images',
                context: 'src/images/copy/'
            }
        ])
    ]
}