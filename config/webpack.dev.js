const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const config = require('./config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const portfinder = require('portfinder')
const devWebpackConfig = merge.smart(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'dist/[name].[hash:8].js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        oneOf: [],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.indexPath,
      minify: {
        html5: true,
      },
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 8080,
    host: 'localhost',
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    open: true,
    overlay: false,
    quiet: false,
    noInfo: false,
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {},
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    builtAt: false,
    entrypoints: false,
    assets: false,
    version: false
  }
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.devServer.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port
    }
    resolve(devWebpackConfig)
  })
})