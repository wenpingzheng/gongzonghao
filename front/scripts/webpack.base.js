// scripts/webpack.base.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { separator } = require('./utils/constant');
const { getEntryTemplate } = require('./utils/helper');

// 将packages拆分成为数组
const packages = process.env.packages.split(separator);

// 调用getEntryTemplate获得对应的entry和htmlPlugins
const { entry, htmlPlugins }  = getEntryTemplate(packages);

module.exports = {
  // 入口文件
  entry,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.css', '.scss', '.json', '.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // 同时认识ts jsx js tsx 文件
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].min.css',
    }),
    // 同时动态生成对应的htmlPlugins
    ...htmlPlugins,
  ],
};
