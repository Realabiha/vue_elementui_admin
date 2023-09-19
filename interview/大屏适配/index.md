# 大屏适配方案选择

- scale
根据16:9的比例对body元素进行scale缩放，body元素使用transform居中处理，html元素溢出隐藏
- rem(vw)
100vw = 1920

```scss
  use: "sass:math";
  $design_width = 1920;
  $design_height = 1080;

  @function px2vw($px){
    @return Math.div($px, $design_width) * 100vw
  };

  @function px2vh($px){
    @return Math.div($px, $design_height) * 100vh
  };

  @function vw2px($vw){
    @return Math.div($vw, 100) * $design_width
  };

  @function vh2px($vh){
    @return Math.div($vh, 100) * $design_height
  }
  



  .body{

  }
```

```js

```
