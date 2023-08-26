const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { TITLE } = require('./src/constant')

const path = require('path')

module.exports = (env, options) => {
  const fixCDNUrl = (_) => (options.mode === 'production' ? '.min' : '')
  // 通用插件
  const plugins = [
    new HtmlWebpackPlugin({
      // template: './public/index.html',
      templateContent: ({ htmlWebpackPlugin }) => `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            http-equiv="X-UA-Compatible"
            content="IE=edge"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${htmlWebpackPlugin.options.title}</title>
          <script src="https://unpkg.com/vue@2.6.14/dist/vue${fixCDNUrl()}.js"></script>
          <script src="https://unpkg.com/vue-router@3.6.5/dist/vue-router${fixCDNUrl()}.js"></script>
          <script src="https://unpkg.com/vuex@3.6.2/dist/vuex${fixCDNUrl()}.js"></script>
          <script src="https://unpkg.com/element-ui@2.15.8/lib/index.js"></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/element-ui@2.15.8/lib/theme-chalk/index.css"
        />
        </head>
        <body>
          <div id="sykj"></div>
        </body>
      </html>
      `,
      title: TITLE,
      favicon: './public/favicon.svg',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new WebpackBundleAnalyzerPlugin({ openAnalyzer: false }),
  ]

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      clean: true,
    },
    resolve: {
      alias: {
        '@/imgs': path.resolve(__dirname, 'src/assets/imgs'),
        '@/css': path.resolve(__dirname, 'src/assets/css'),
        '@/js': path.resolve(__dirname, 'src/assets/js'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/filters': path.resolve(__dirname, 'src/filters'),
        '@/directives': path.resolve(__dirname, 'src/directives'),
        '@/store': path.resolve(__dirname, 'src/store'),
      },
      extensions: ['.js', '.scss', '.css', '.vue'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          include: /src/,
        },
        {
          test: /\.css$/,
          use: [
            // MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
          ],
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
                additionalData: "@import '@/css/common.scss';",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024,
            },
          },
          generator: {
            filename: 'imgs/[name][ext]',
          },
        },
        {
          test: /\.vue$/,
          use: 'vue-loader',
          include: /src/,
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        NODE_ENV: JSON.stringify(options.mode),
      }),
      ...plugins,
    ],
    devServer: {
      port: 8680,
      compress: true,
      // hot: true,
      proxy: {
        '/api': {
          rewrite: { '/api': '' },
        },
      },
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        name: 'common',
        minChunks: 1,
        cacheGroups: {
          // corejs: {
          //   test: /[\\/]core-js[\\/]internals[\\/]/,
          //   name: 'internals',
          //   priority: 10,
          //   reuseExistingChunk: true,
          // },
        },
      },
      usedExports: true,
    },
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
    },
    cache: {
      type: 'filesystem',
    },
    devtool: options.mode == 'development' ? 'source-map' : false,
  }
}
