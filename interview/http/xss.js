/*
  跨站脚本攻击
  URL/DOM中注入了未校验的恶意脚本并执行
  CSP 内容安全策略 限制哪些脚本可以加载和执行 响应头Content-Security-Policy: script-src self https
  校验、过滤、转码用户输入
  设置Cookie HttpOnly属性 防止恶意脚本获取Cookie
*/ 