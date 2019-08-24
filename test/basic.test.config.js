const WebpackCDNInject = require('../index.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: '../dist/[name].js',
    pathinfo: false
  },
  module: {
    rules: [{
      'test': /\.html$/,
      'exclude': /node_modules/,
      'include': [
        path.resolve(__dirname, 'test.html')
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
    new HtmlWebpackPlugin({
      'title': 'Basic Test',
      'template': './test/test.html',
      'filename': './test.html',
      'minify': false
    }),
    new WebpackCDNInject({
      'chartjs': '//unpkg.com/chart.js@2.8.0/dist/Chart.min.js',
      'prismcss': '//unpkg.com/prismjs@1.17.1/themes/prism.css',
      'prismjs': '//unpkg.com/prismjs@1.17.1/prism.js',
      'prismjson': '//unpkg.com/prismjs@1.17.1/components/prism-json.min.js',
      'prismjsx': '//unpkg.com/prismjs@1.17.1/components/prism-jsx.min.js',
      'react': '//unpkg.com/react@16.8.0/umd/react.production.min.js',
      'react-dom': '//unpkg.com/react-dom@16.8.0/umd/react-dom.production.min.js',
      'react-dom/server': '//unpkg.com/react-dom@16.8.0/umd/react-dom-server.browser.production.min.js',
      'react-router-dom': '//unpkg.com/react-router-dom@5.0.1/umd/react-router-dom.min.js',
      'prop-types': '//unpkg.com/prop-types@15.7.2/prop-types.min.js'
    })    
  ]
};

