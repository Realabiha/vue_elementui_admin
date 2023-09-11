/*
  示例
  Set-Cookie: username=jimu; domain=jimu.com; path=/blog; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly 

  本地存储
  Cookie
  1.对比Storage
  不用手动存储、携带，HTTP响应头Set-Cookie存储到浏览器(一次可以有多个Set-Cookie字段)，HTTP请求头Cookie携带
  2.读取限制
  Domian域名限制，如果Set-Cookie没有设置，默认为当前URL的一级域名(www.abiha.com--->请求abiha.com及其子域名时浏览器都会携带该Cookie)
  Path路径限制，同域下HTTP请求携带Cookie限制( / ---> 请求同域下的/a时浏览器也会携带Cookie)
  Expires/Max-Age时间限制，Expires GMT格式是一个绝对时间并且浏览器会以本地系统时间为准；Max-Age是指从现在开始有效秒数，过了有效时间会清除Cookie，如果未指定则有效期是当前会话，后者优先级高于前者
  Secure属性指定浏览器只有在HTTPS请求时携带Cookie
  HttpOnly属性指定只有HTTP请求才能拿到Cookie，js不能操作

  Session
  基于Cookie，存储SessionId在Cookie中，前后端都要存储，后端考虑分布式问题

  Token
  请求令牌，只需要前端存储，一般采用Base64编码，防止篡改会采用算法签名(摘要+加密)，JWT是一种成熟的编码方案(Header+Content+Sign)，AccessToken/RefreshToken提升安全性和用户体验

  单点登录
  1.同域下 Cookie设置为主域名
  2.非同域下 SSO系统登陆，发放和校验Token
*/