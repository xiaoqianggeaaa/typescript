const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const APP_PATH = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: {
    app: './src/main.tsx'
  },
  output: {
    filename: 'dist/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
          {
            test: /\.(j|t)sx?$/,
            include: APP_PATH,
            use: [
              {
                 loader: 'babel-loader',
                 options: {
                   cacheDirectory: true
                 }
              }
            ]
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true
    }),
    new CleanWebpackPlugin()
  ]
}