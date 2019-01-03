module.exports = {
  // 基本路径
  // 部署生产环境和开发环境下的URL。
  baseUrl: process.env.NODE_ENV === 'production' ? '/dayu/' : '/',
  // 输出文件目录
  outputDir: 'dayu',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'assets',
  /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
     *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
     *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * */
  productionSourceMap: false,
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      },
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 75,
            exclude: /node_modules|folder_name/i
          })
        ]
      }
    }
  },
  devServer: {
    // 设置主机地址
    // host: '172.20.10.5',
    // 设置默认端口
    // port: 8080,
    // 设置代理
    proxy: {
      '/blockchain': {
        // 目标 API 地址
        // target: 'http://10.207.2.37:8181/',
        target: 'https://bigfish.51kupai.com/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    }
  }
}
