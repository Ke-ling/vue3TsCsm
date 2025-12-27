const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  // 方式1：使用vue cil提供的属性
  //应用打包输出的目录
  outputDir: './build',
  //应用程序部署的基础路径
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: '/',

  //方式2：和webpack属性一致
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css', // 自动导入组件样式
          }),
        ],
      }),
    ],
  },

  //方式2:使用函数的语法
  // configureWebpack: (config) => {
  //   config.resolve.alias["@"] = path.resolve(__dirname, "src");//vuecil5后不用配置
  //   config.resolve.alias["components"] = path.resolve(__dirname, "src/components");
  // },

  //方式3：使用chainWebpack 链式调用配置webpack的属性
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('components', '@/components')
  // },

  //开发环境配置proxy反向代理
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://codercba.com:5000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
})
