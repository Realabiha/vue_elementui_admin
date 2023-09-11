/*
AMD
CMD
script标签加载模块，并缓存模块

ESM
导出引用，但不能直接修改(const)
依赖树静态分析标记模块
Webpack usedExports: true Tree Shaking(生产自动开启)，SideEffects标记有副作用(没直接引用但不能删掉)
import ---> 标记 harmony import
引用的export ---> 标记 harmony export
未引用的export ---> 标记 unused harmony export
terser/uglifyjs 摇树删除
babel-loader 默认会把ESM转成commonjs通过配置@babel/preset-env的modules: false保留
*/ 