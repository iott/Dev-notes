### 1. 根据key模糊匹配批量删除key
  1.1 方式一：
  ```
  管道命令和xargs的区别及redis批量删除命令
  由于redis的del命令不运行正则表达式，所以可以如下删除
  keys * | xargs redis_cli del
  eg:
    redis-cli KEYS "sample_pattern:*" | xargs redis-cli DEL
  ```
  1.2 方式二：
  ```
  client.keys('aa:*',function (err,keys) {
    console.time('keys');
    keys.forEach(key => client.del(key))
    console.timeEnd('keys');
  });
  ```
