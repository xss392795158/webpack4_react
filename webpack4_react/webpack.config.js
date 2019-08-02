const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname,  './src/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath:'/'  // 设置主出口位于根目录
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    unknownContextCritical : false,
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader', 
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ] 
      }, 
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      // {
      //   test:/\.jsx$/, 
      //   loaders:['jsx-loader?harmony']
      // },
      /* { test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname),
        query: {
          preset: ['es2015', 'react']
        }
      }, */
        // use: 'jsx-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
        // exclude: [/node_modules/, require.resolve('./views/index.html')],
        // use: {
        //     loader: 'file-loader',
        //     query: {
        //         name: '[name].[ext]'
        //     },
        // },
      },
    ]
  },
  target: 'node', // 解决控制台child-progress报错问题
  node: {
    fs: "empty"
  },
  externals: [{
    xmlhttprequest:'{XMLHttpRequest:XMLHttpRequest}'
  }],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/views/index.html'),
        inject: true
      }
    )
  ]
};