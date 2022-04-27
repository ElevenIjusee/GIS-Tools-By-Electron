import { defineConfig } from 'umi';
import extraWebpackConfig from './webpack.config';

export default defineConfig({
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  alias: {
    imgs: '/public/image',
  },
  // routes: [{ path: '/', component: '@/layout/' }],
  // fastRefresh: {},
  electronBuilder: {
    //可选参数
    buildType: 'vite', //webpack或vite，当编译出现问题，可尝试切换为webpack
    mainSrc: 'src/main', //默认主进程目录
    preloadSrc: 'src/preload', //默认preload目录，可选，不需要可删除
    routerMode: 'hash', //路由 hash或memory或browser 仅electron下有效
    outputDir: 'dist_electron', //默认打包目录
    externals: ['serialport'], //node原生模块配置，打包之后找不到包也需要配置在这里
    rendererTarget: 'web', //构建目标electron-renderer或web，使用上下文隔离时，必须设置为web
    // viteConfig(config: InlineConfig, type: ConfigType) {
    //主进程Vite配置
    //配置参考 https://vitejs.dev/config/
    //ConfigType分为main和preload可分别配置
    // },
    //通过 webpack-chain 的 API 修改 webpack 配置。
    // mainWebpackChain(config: Config, type: ConfigType) {
    //ConfigType分为main和preload可分别配置
    // if (type === 'main') {}
    // if (type === 'preload') {}
    // },
    preloadEntry: {
      //默认值 key为preload文件名 值为preload输出文件名
      //输出文件名不能为main.js会和主进程文件名冲突
      //文件名为preload目录下多文件名
      //多级目录时key为xxxx/xxxx.ts
      //使用时输出文件会和主进程在同一目录下 preload: path.join(__dirname, 'preload.js')
      'index.ts': 'preload.js',
    },
    builderOptions: {
      //配置参考 https://www.electron.build/configuration/configuration
      appId: 'wwww.ijusee.com',
      productName: '三维模型转换工具',
      publish: [
        {
          provider: 'generic',
          url: 'http://localhost/test',
        },
      ],
      win: {
        icon: './public/image/pack.png',
        extraFiles: ['./extraResources/'],
        // extraResources: {
        //   from: './extraResources/',
        //   to: '../extraResources',
        // },
      },
    }, //electronBuilder参数
  },

  // chainWebpack: extraWebpackConfig,
});
