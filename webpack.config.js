const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { TITLE } = require('./src/constant')

const path = require('path');

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
  new WebpackBundleAnalyzerPlugin({ openAnalyzer: false })
]




module.exports = (env, options) => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.scss', '.css', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          include: /src/
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
                // additionalData: '@import \'@/css/common.scss\';',
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
    plugins: [new DefinePlugin({
      NODE_ENV: JSON.stringify(options.mode)
    }), ...plugins],
    devServer: {
      port: 8680,
      compress: true,
      hot: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/line',
          pathRewrite: { '^/api': '' }
        }
      }
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
    },
    devtool: options.mode == 'development' ? 'source-map' : false
  }
}