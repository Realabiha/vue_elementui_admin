module.exports = {
  presets: [
    [
      '@babel/preset-env', 
      {
        // 按需加载core-js polyfill
        "useBuiltIns": 'usage',
        // core-js@3
        'corejs': '3',
        "targets": "defaults, ie > 10" 
        // 'modules': 'commonjs',
      }
    ]
  ],
  plugins:  [
    '@babel/plugin-transform-modules-commonjs',
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
        'builtins': 'usage',
        // @babel/runtime-corejs@3
        "corejs": 3
      }
    ]
  ]
}