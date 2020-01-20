const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
module.exports = merge.smart(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'dist/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        oneOf: [
          // webpack.base.js
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
              name: 'media/[path][name].[contenthash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot,
            },
          },
          {
            test: /\.(less|css)$/,
            use: [
              MiniCssExtractPlugin.loader, // 注意书写的顺序
              {
                loader: 'css-loader',
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: config.indexPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeOptionalTags: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // chunkFilename: '[name].[contenthash:8].chunk.css'
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240, // 大于这个大小的文件才会被压缩
      minRatio: 0.8,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as (entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
      include: ['app']
      // include:'allChunks'
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      }),
    ],
  },
})
