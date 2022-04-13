# Controller

处理传入的请求和向客户端返回响应

- 被 `@Controller` 装饰的类就是一个 `Controller` ,将他放到 `module` 对应的 `controller` 中就能够使用他了。

- 获取 HTTP 的请求
  - `@Get(...url)` `@Post(...url)` `@Put(...url)` `@Delete(...url)`,通过这些装饰器来修饰方法，可以拦截到响应的请求
  -

...

# Providers

被 `@Injectable` 装饰的类都是 Providers
