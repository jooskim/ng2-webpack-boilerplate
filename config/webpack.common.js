const webpack = require('webpack');
const helpers = require('./helpers');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextplugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

const METADATA = {
  title: 'Angular 2 with Webpack Starter',
  baseUrl: '/'
};

module.exports = {
  metadata: METADATA,
  entry: {
    'vendor': 'app/vendor.ts',
    'app': 'main.browser.ts'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.html'],
    root: helpers.root('src'),
    moduleDirectories: ['node_modules']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/angular2')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e).ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextplugin.extract('style-loader', 'css-loader')
      },
      {
      	test: /\.scss$/,
        exclude: /node_modules/,
      	loader: ExtractTextplugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      }
    ],
    plugins: [],
    node: {
      global: 'window',
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}
