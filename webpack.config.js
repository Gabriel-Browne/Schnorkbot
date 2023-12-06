const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// I commented some things out because I don't know what it does...
// and it still works.Come back and delete if not needed, or figure out what this is. - AB

module.exports = {
  //   entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  //   devServer: {
  //     static: './dist',
  //   },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
