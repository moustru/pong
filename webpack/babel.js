const babelOptions = preset => {
  const opts = {
    presets: []
  }

  if (preset) opts.presets.push(preset);
  return opts;
}

module.exports = babelOptions;