/* eslint-disable */
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'bundle.runtime.js',
    // library: {
    //   name: 'ESPlugins',
    //   type: 'umd',
    // },
  },
  target: ['web', 'es5'],
  devServer:{
    hot: true,
    compress: false,
    open: true,
    port: 8040,
    static: {
        directory: './',
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname, 'src')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false, // 关闭es6模块化
          outputPath: 'assets/image/', // 输出路径
          name: '[hash:10].[ext]', // [hash:10]对文件重命名，取hash前10位 [ext]取文件原来的扩展名
        },
      },
      {
        exclude: /\.(css|js|ts|html|less|scss|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: './assets/base/',
        },
      },
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         fixe: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  optimization: {
    // sideEffects: true,
    // 模块只导出被使用的成员
    // usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // 压缩输出结果
    minimize: false,

  },
  plugins: [],
};
