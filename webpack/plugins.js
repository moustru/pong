const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isProd = process.env.NODE_ENV === 'production';
const { filename } = require('./utils');

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './pong.pug',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]

  if (isProd) base.push(new BundleAnalyzerPlugin());
  return base;
}

module.exports = plugins;