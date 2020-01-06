const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const config = require('./config')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'dist/[name].[hash:8].js',
    publicPath: config.publicPath
  }
})