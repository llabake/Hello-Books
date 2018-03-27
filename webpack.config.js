const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = Boolean(process.env.npm_lifecycle_event.match(/:production/))

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  ENTRY: path.resolve(__dirname, 'client/js'),
  SRC: path.resolve(__dirname, 'client'),
};

module.exports = {
  entry: path.join(paths.ENTRY, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  JSON.stringify(isProduction ? 'production' : 'development')
    })
],
    devServer: {
      contentBase: paths.SRC,
      compress: true,
        historyApiFallback: true
    },
  devtool: 'inline-source-map',
  module: { 
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]-[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              optipng: {
                optimizationLevel: 7,
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
