module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        targets: 'defaults'
      }
    ]
  ],
  plugins:  [
    // [
    //   "component",
    //   {
    //     "libraryName": "node_modules/element-ui",
    //     // "styleLibraryName": "theme-chalk",
    //     // "libDir": "/packages",
    //     // "ext": ".scss",
    //     // "mixin": true
    //   }
    // ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk",
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "builtins": "usage",
        "corejs": 3
      }
    ]
  ]
}