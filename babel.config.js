module.exports = {
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
      }
    ],
    "@vue/babel-preset-jsx"
  ],
  plugins:  [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk",
      }
    ],
    "@babel/plugin-transform-runtime",
  ]
}