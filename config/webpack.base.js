const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const argv = require('yargs').argv
const APP_PATH = path.resolve(__dirname, '../src')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const bundleAnalyzerReport = argv.report
const CopyWebpackPlugin = require('copy-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const getClientEnvironment = require('./env')
const env = getClientEnvironment(config.publicPath)
const webpackConfig = {
  plugins: [],
}
if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.join(config.assetsRoot, './report.html'),
    })
  )
}

module.exports = merge(webpackConfig, {
  entry: {
    app: './src/main.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: 'dist/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        // 提取公共模块
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common',
        },
      },
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: 'html-loader',
          },
          {
            test: /\.(j|t)sx?$/,
            include: APP_PATH,
            use: [
              {
                loader: 'babel-loader',
                options: {
                    plugins: [
                      '@babel/plugin-syntax-dynamic-import', // 这是新加入的项
                      ['@babel/plugin-proposal-class-properties', { 'loose': true }]
                    ],
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            loader: 'awesome-typescript-loader',
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false, // 如果要启用css modules，改为true即可
                },
              },
              'postcss-loader', // 注意插入的位置，webpack.prod.js也要加这一项！！！
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 小于这个大小的图片，会自动base64编码后插入到代码中
              name: 'img/[name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot,
            },
          },
          // 下面这个配置必须放在最后
          {
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true,
    }),
    // 注意：注入插件一定要在HtmlWebpackPlugin之后使用
    // 在html模板中能够使用环境变量
    new InterpolateHtmlPlugin(env.raw),
    // 在js代码中能够使用环境变量(demo: process.env.REACT_APP_ENV === 'dev')
    new webpack.DefinePlugin(env.stringified),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public',
        ignore: ['index.html'],
      },
    ]),
  ],
})
