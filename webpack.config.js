const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {TITLE} = require('./src/constant')

const path = require('path');
const argv = process.env.npm_lifecycle_script
// 通用插件
const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    title: TITLE,
    favicon: './public/favicon.svg'
  }),
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  new WebpackBundleAnalyzerPlugin({openAnalyzer: false})
]

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  resolve: {
    alias: {
      '@imgs': path.resolve(__dirname, 'src/assets/imgs'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@js': path.resolve(__dirname, 'src/assets/js'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@filters': path.resolve(__dirname, 'src/filters'),
      '@directives': path.resolve(__dirname, 'src/directives'),
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.js', '.scss', '.css', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [/src/, /node_modules/],
        exclude: [/core-js/]
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader', 
          'css-loader'
        ]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import \'@css/common.scss\';',
            }
          }
        ]  
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: 'imgs/[name][ext]'
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: /src/
      }
    ]
  },
  plugins,
  devServer: {
    port: 8680,
    compress: true,
    // hot: true,
    proxy: {}
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      name: 'common',
      minChunks: 1,
      cacheGroups: {
        vue: {
          test: /[\\/]vue[\\/]/,
          name: 'vue',
          priority: 10
        },
        vuex: {
          test: /[\\/]vuex[\\/]/,
          name: 'vuex',
          priority: 10
        },
        vuex: {
          test: /[\\/]vue-router[\\/]/,
          name: 'vue-router',
          priority: 10
        },
        'element-ui': {
          test: /[\\/]element-ui[\\/]/,
          name: 'element-ui',
          priority: 10
        }
      }
    }
  },
  cache: {
    type: 'filesystem'
  }
}