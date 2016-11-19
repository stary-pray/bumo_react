import webpack from "webpack";
import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import autoprefixer from "autoprefixer";
import FileSystem from "fs";

const publicPath = 'https://static.6koi.com/';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

const getEntry = function () {
  const entry = {};

  entry.app = './src/index';
  entry.vendors = [
    'babel-polyfill',
    'react',
    'moment',
    'classnames',
    'react-masonry-component',
    'react-dom',
    'react-dropzone',
    'react-router',
    'redux-form',
    'immutable',
    'lodash',
    'auth0-lock',
  ];

  return entry;
};

export default {
  debug: true,
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: getEntry(),
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: publicPath,
    filename: 'bumo.bundle.[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS), //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.optimize.CommonsChunkPlugin('vendors', 'bumo.vendors.[chunkhash].js'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /cn/),
    new ExtractTextPlugin('bumo.styles.[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    function () {
        this.plugin("done", function (statsData) {
          const stats = statsData.toJson();

          if (!stats.errors.length) {
            const htmlFileName = "dist/index.html";
            const html = FileSystem.readFileSync(path.join(__dirname, htmlFileName), "utf8");

            const htmlOutput = html
              .replace( /\/bumo\.vendors\.js/i, publicPath + stats.assetsByChunkName.vendors[0])
              .replace( /\/bumo\.bundle\.app\.js/i, publicPath + stats.assetsByChunkName.app[0])
              .replace( /\/bumo\.styles\.css/i, publicPath + stats.assetsByChunkName.app[1])
              ;
            FileSystem.writeFileSync( path.join(__dirname, htmlFileName), htmlOutput);
          }

          if (stats.errors && stats.errors.length)
          {
            console.warn('***** error ****\n************\n', stats.errors);
            process.exit(1);
          }
        });
      }
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint']},
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract("css?sourceMap!postcss?sourceMap!sass?sourceMap")
      },
      {test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/, loader: 'imports?define=>false&this=>window'},
      { test: /\.svg$/, loader: 'svg-inline' },
      { test: /\.((woff2?)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|ico)$/, loader: 'url?limit=100000' },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|gif|jpe?g|png)$/, loader: 'file' },
    ]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
