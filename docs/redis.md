### 1. 根据key模糊匹配批量删除key
  #### 1.1 方式一：
   管道命令和xargs的区别及redis批量删除命令  <br>
   由于redis的del命令不运行正则表达式，所以可以如下删除
   
    ```
     keys * | xargs redis_cli del
     eg:redis-cli KEYS "sample_pattern:*" | xargs redis-cli DEL
    ```

#### 1.2 方式二：
  ```
  client.keys('aa:*',function (err,keys) {
    console.time('keys');
    keys.forEach(key => client.del(key))
    console.timeEnd('keys');
  });
  ```
  
#### 1.3 方式三
使用ioredis库
```
var Redis = require('ioredis');
var redis = new Redis();
redis.keys('sample_pattern:*').then(function (keys) {
  // Use pipeline instead of sending
  // one command each time to improve the
  // performance.
  var pipeline = redis.pipeline();
  keys.forEach(function (key) {
    pipeline.del(key);
  });
  return pipeline.exec();
});

//However when your database has a large set of keys (say a million), keys will block the database for several seconds. In //that case, scan is more useful. ioredis has scanStream feature to help you iterate over the database easily:

var Redis = require('ioredis');
var redis = new Redis();
// Create a readable stream (object mode)
var stream = redis.scanStream({
  match: 'sample_pattern:*'
});
stream.on('data', function (keys) {
  // `keys` is an array of strings representing key names
  if (keys.length) {
    var pipeline = redis.pipeline();
    keys.forEach(function (key) {
      pipeline.del(key);
    });
    pipeline.exec();
  }
});
stream.on('end', function () {
  console.log('done');
});

```
 
