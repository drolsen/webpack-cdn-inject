const WebpackCDNInject = require('../index.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'test.js'),
  output: {
    path: path.resolve(__dirname, '../dist'), 
    filename: '../dist/copy/test.js',
    pathinfo: false
  },
  module: {
    rules: []
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([ // react-routes rewrite files for hosting guide on remote a web server.
      {
        from: path.resolve(__dirname, 'test.html'), // for IIS servers
        to: path.resolve(__dirname, '../dist/copy')
      }
    ]), 
    new WebpackCDNInject({
      body: [
        'http://unpkg.com/chart.js@2.8.0/dist/Chart.min.js',
        'http://unpkg.com/prismjs@1.17.1/prism.js'
      ],
      head: [
        'http://unpkg.com/prismjs@1.17.1/themes/prism.css'
      ],
      entry: 'testB',
      wait: false
    })
  ]
};

