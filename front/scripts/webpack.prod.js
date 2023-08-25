const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig =  {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [new CleanWebpackPlugin(), new FriendlyErrorWebpackPlugin()],
}

module.exports = merge(prodConfig, baseConfig);