// webpack.dev.js
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
const SSICompileWebpackplugin = require('ssi-webpack5-plugin');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../public'),
    },
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
  },
  plugins: [
    new SSICompileWebpackplugin({
      localBaseDir: path.join(__dirname, '../public'),
    })
  ]
};

module.exports = merge(devConfig, baseConfig);