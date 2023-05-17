const { defineConfig } = require('@vue/cli-service')
const compressionPlugin = require("compression-webpack-plugin")
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new compressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|woff|woff2|ttf|eot|png|svg|jpg|jpeg)(\?.*)?$/i,
        //threshold: 10240,//文件大于这个值（10K）的才压缩，默认为0
        minRatio: 0.8,//默认为0.8，能压缩到小于等于原来的80%才压缩
      })
    ]
  }
})
