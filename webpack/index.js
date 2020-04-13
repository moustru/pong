const optimization = require('./optimization');
const plugins = require('./plugins');
const cssLoaders = require('./css-loaders');
const jsLoaders = require('./js-loaders');
const babelOptions = require('./babel');
const { filename } = require('./utils');

module.exports = {
  optimization,
  plugins,
  cssLoaders,
  jsLoaders,
  babelOptions,
  filename
}
