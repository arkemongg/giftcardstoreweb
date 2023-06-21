const path = require('path');
const glob = require('glob');

module.exports = {
    entry: Object.assign(
        glob.sync('./js/*.js').reduce((entries, entry) => {
          const name = entry.replace('./js/', '').replace('.js', '');
          entries[name] = `./${entry}`;
          return entries;
        }, {}),
      ),
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
          },
        },
      },
    ],
  },
};