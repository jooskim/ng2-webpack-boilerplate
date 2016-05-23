const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextplugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.METADATA, {
  host: 'localhost',
  port: 3000,
  ENV: ENV
});

module.exports = webpackMerge(commonConfig, {
  metadata: METADATA,
  debug: true,
  devtool: 'cheap-module-source-map', // https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  output: {
    path: helpers.root('dev-build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new DefinePlugin({
      ENV: METADATA.ENV,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'app'].reverse()
    }),
    new ExtractTextplugin('assets/[name].css'),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ],
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dev-build')
  }
});
