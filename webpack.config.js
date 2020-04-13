const WebpackCfg = require('./webpack');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: [ '@babel/polyfill', './app.js' ],
  output: {
    filename: WebpackCfg.filename('js'),
    path: path.resolve(__dirname, 'build')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  optimization: WebpackCfg.optimization(),
  devtool: isDev ? 'source-map' : '',
  devServer: {
    port: 8081,
    hot: isDev
  },

  plugins: WebpackCfg.plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: WebpackCfg.jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: WebpackCfg.babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.styl$/,
        use: WebpackCfg.cssLoaders('stylus-loader')
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  }
}