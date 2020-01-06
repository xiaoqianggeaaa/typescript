const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'dist/[name].[contenthash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]

})