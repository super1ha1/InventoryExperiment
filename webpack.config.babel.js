const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');

const deps = [
  'moment/min/moment.min.js',
  'underscore/underscore-min.js',
];

/* Include SASS path here if you want to this in your sass files:
 *   @import 'bourbon';
 */
const bourbon = require('node-bourbon').includePaths;

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const SASS_DEPS = [bourbon].toString();

function generateBuildNumber() {
  return (Math.random() + 1).toString(36).substr(2, 6).toUpperCase();
}

const BUILD_NUMBER = generateBuildNumber();

const common = {
  entry: path.resolve(ROOT_PATH, 'app/index.js'),
  output: {
    filename: BUILD_NUMBER + '-[hash].js',
    path: path.resolve(ROOT_PATH, 'build'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass?includePaths[]=' + SASS_DEPS],
        include: path.resolve(ROOT_PATH, 'app'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass?includePaths[]=' + SASS_DEPS],
        include: path.resolve(ROOT_PATH),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Inventory Management App',
      template: path.resolve(ROOT_PATH, 'app/index.html'),
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
      __STAGING__: JSON.stringify(JSON.parse(process.env.BUILD_STAGING || 'false')),
      __BUILD_NUMBER__: JSON.stringify(BUILD_NUMBER)
    }),
  ],
  resolve: {
    alias: {
      'styles': path.resolve(ROOT_PATH, 'app/styles'),
    },
    extensions: ['', '.js', '.jsx', '.json'],
  },
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: '#eval-source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel?optional=runtime'],
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
    },
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
} else if (TARGET === 'deploy' || TARGET === 'deploys') {
  const config = {
    resolve: {
      alias: {},
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel?optional=runtime',
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
      noParse: [],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compressor: {
          screw_ie8: true,
          warnings: false,
        },
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
      }),
    ],
  };
  deps.forEach((dep) => {
    const depPath = path.resolve(nodeModulesDir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
  });
  module.exports = merge(common, config);
}
