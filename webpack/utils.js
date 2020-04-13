const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  filename: ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
}