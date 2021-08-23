const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: process.env.NODE_ENV == 'production' ? './' : '/',
  productionSourceMap: false,
  outputDir: 'nader-admin',
  assetsDir: 'static',
  lintOnSave: false, // 关闭eslint
  devServer: {
    proxy: {
      '/api': {
        // host: 'dczxxy.natappfree.cc',
        // port: 80,
        // target: 'http://test.sxzichen.com/smart_sand/',
        target: 'http://127.0.0.1:8888',
        // target: 'http://p28mje.natappfree.cc/smart_sand/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end()
    config.plugins.delete('prefetch'); //关闭预先加载模块
    if(process.env.NODE_ENV === 'production') {
      // if(process.env.npm_config_report) {

      // }
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end();
    };
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('static', resolve('src/static'))
      .set('view', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('http', resolve('src/api'))
      .set('http2', resolve('src/api/index2'))
      .set('api', resolve('src/api/api'))
    // .set('infoStation', resolve('public/infoStation.JS'))
  },
  configureWebpack: (config) => {
    const plugins = [];
    if(process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      )
      // 服务器也要相应开启gzip
      plugins.push(
        new CompressionPlugin({
          // algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10000, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )
      plugins.push(new Webpack.optimize.ModuleConcatenationPlugin())
      return {
        plugins
        // plugins: [
        //   new CompressionPlugin({
        //     test: /\.js$|\.html$|\.css/, //匹配文件名
        //     threshold: 10240, //对超过10k的数据进行压缩
        //     deleteOriginalAssets: true //是否删除原文件
        //   }),
        //   new Webpack.optimize.ModuleConcatenationPlugin()
        // ],
        // externals: {
        // 'vue-router': 'VueRouter',
        // 'vuex': 'Vuex',
        // 'axios': 'axios',
        // 'element-ui': 'ELEMENT',
        // }

      }
    }
  },
}