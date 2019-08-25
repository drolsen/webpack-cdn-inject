const WebpackCDNInject = require('../index.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: '../dist/body/test.js',
    pathinfo: false
  },
  module: {
    rules: [{
      'test': /\.html$/,
      'exclude': /node_modules/,
      'include': [
        path.resolve(__dirname, 'test.a.html')
      ],
      'use': {
        'loader': 'html-loader', // (see: https://www.npmjs.com/package/html-loader)
        'options': { 'minimize': false }
      }
    }]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      'title': 'Basic Test',
      'template': './test/test.a.html',
      'filename': './body/test.html',
      'minify': false
    }),
    new WebpackCDNInject({
      body: [
        'http://unpkg.com/chart.js@2.8.0/dist/Chart.min.js',
        'http://unpkg.com/prismjs@1.17.1/prism.js'
      ]
    })  
  ]
};

