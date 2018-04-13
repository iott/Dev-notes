
### 1. Express
1.1 Express 更为贴近 Web Framework 这一概念，比如自带 Router、路由规则等（在没有剥离bodyParser之前更为贴切）

1.2 Handler 的处理方法
  ```
  普通的回调函数,Express 是在同一线程上完成当前进程的所有 HTTP 请求
  ```
1.3 Express 的优点是线性逻辑：路由和中间件完美融合，通过中间件形式把业务逻辑细分，简化，一个请求进来经过一系列中间件处理后再响应给用户，再复杂的业务也是线性了，清晰明了。

1.4 Express 是基于 callback 来组合业务逻辑。Callback 有两大硬伤，一是不可组合，二是异常不可捕获。Express 的中间件模式虽然在一定程度上解决这两个问题，但没法彻底解决。

### 2.Koa
2.1 koa的内容很少，就是对nodejs本身的createServer函数做了简单的封装，没有做很多的延伸，其提供的是一个架子，而几乎所有的功能都需要由第三方中间件完成

2.2 Handler 的处理方法
  ```
  利用生成器函数（Generator Function）来作为响应器,利用 co 作为底层运行框架，利用 Generator 的特性，实现“协程响应”（并不能将 Generator 等价于协程，在 V8 的邮件列表中对 Generator 的定义基本是 `coroutine-like`
  ```
2.3 借助 promise 和 generator 的能力，丢掉了 callback，完美解决异步组合问题和异步异常捕获问题。

2.4 koa 把 express 中内置的 router、view 等功能都移除了，使得框架本身更轻量化

2.5 在处理中间件的逻辑上express可以理解为每次一个中间件执行完毕就去主动去通知“中心”去启动下一个中间件；而koa可以理解为链式过程，每一个中间件会启动后         一个中间件。
