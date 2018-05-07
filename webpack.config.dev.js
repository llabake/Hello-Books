
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const paths = {
  SRC: path.resolve(__dirname, 'client'),
};

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  JSON.stringify('development')
    }),
  ],
  devServer: {
    contentBase: paths.SRC,
    compress: true,
    historyApiFallback: true,
    inline: true,
  },
});
