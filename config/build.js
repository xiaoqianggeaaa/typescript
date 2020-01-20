const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')
const ora = require('ora')
const chalk = require('chalk') // 如果要改变输出信息的颜色，使用这个，本例没有用到
const spinner = ora('webpack编译开始...\n').start()
webpack(webpackConfig, function (err, stats) {
  if (err) {
    spinner.fail('编译失败')
    console.log(err)
    return
  }
  spinner.succeed('编译结束!\n')

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})