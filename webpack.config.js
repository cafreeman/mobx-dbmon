const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const parts = require('./libs/parts')

const PATHS = {
  src: path.join(__dirname, 'src'),
  style: [
    path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.css'),
    path.join(__dirname, 'src', 'styles.css')
  ],
  dist: path.join(__dirname, 'dist')
};

const common = {
  entry: {
    src: PATHS.src,
    style: PATHS.style
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },

  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'mobx-dbmon'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]',
      },
      {
        'test': /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?/,
        loader: 'url-loader',
        query: {
          prefix: 'font/',
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?/,
        loader: 'url-loader',
      },
    ]
  }
}

switch (process.env.npm_lifecycle_event) {
  // production build
  case 'compile':
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.clean(PATHS.dist),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.typescript(PATHS.src),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.src])
    );
    break;
  // dev build
  default:
    config = merge(
      common,
      parts.dashboard(),
      {
        devtool: 'eval-source-map'
      },
      parts.css(PATHS.style),
      parts.typescript(PATHS.src),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
    break;
}

module.exports = config;
