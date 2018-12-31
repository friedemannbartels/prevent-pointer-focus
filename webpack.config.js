const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  entry: {
    'demo': './src/demo'
  },

  output: {
    filename: 'prevent-pointer-focus.min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
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
      template: 'src/demo.html'
    })
  ]
}

module.exports = config
