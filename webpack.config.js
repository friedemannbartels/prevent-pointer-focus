const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const license = `/** @license prevent-pointer-focus
* Copyright (c) Friedemann Bartels
*
* This source code is licensed under the MIT license.
*/`

const config = {
  entry: {
    'demo': './src/demo',
    'prevent-pointer-focus': './src/index'
  },

  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },

  plugins: [
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/demo.html',
      excludeChunks: ['prevent-pointer-focus']
    }),
    new webpack.BannerPlugin({
      banner: license,
      raw: true
    })
  ]
}

module.exports = config
