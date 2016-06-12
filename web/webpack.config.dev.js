import webpack from "webpack";
import path from "path";
import autoprefixer from "autoprefixer";

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

const getEntry = function () {
  const entry = {};

  entry.app = [
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ];
  entry.vendors = [
    'babel-polyfill',
    'react',
    'moment',
    'classnames',
    'react-masonry-component',
    'react-dom',
    'react-dropzone'];

  return entry;
};

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: getEntry(),
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bumo.bundle.[name].js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), //Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.optimize.CommonsChunkPlugin('vendors', 'bumo.vendors.js'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /cn/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint']},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss?sourceMap', 'sass?sourceMap']},
      
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
