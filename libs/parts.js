const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.dashboard = function() {
  return {
    plugins: [
      new DashboardPlugin()
    ]
  };
}

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep:true
      })
    ]
  };
}

exports.typescript = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: paths,
          loader: 'awesome-typescript-loader'
        }
      ]
    }
  };
}

exports.css = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
          include: paths
        }
      ]
    }
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        mangle: {
          screw_ie8: true
        }
      }),
    ],
  };
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  };
}

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths
      })
    ]
  };
}