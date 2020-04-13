const babelOptions = require('./babel');
const isDev = process.env.NODE_ENV === 'development';

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) loaders.push('eslint-loader');
  return loaders;
}

module.exports = jsLoaders;