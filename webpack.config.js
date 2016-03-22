var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'assets/src'),
  build: path.join(__dirname, 'assets/build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // Thq:e build chapter contains an example of the latter.
  entry: [ 
    PATHS.src + '/js/index.jsx'
  ],

  output: {
    path: PATHS.build,
    filename: 'main.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','stage-0']
        }
      }, // to transform JSX into JS
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader') 
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new ExtractTextPlugin('main.css')
  ]
};