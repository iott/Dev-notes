const redis = require('redis');
const client =redis.createClient(6379,"127.0.0.1");

//方法一：
// client.keys('aa:*',function (err,keys) {
//   console.time('keys');
//   keys.forEach(key => client.del(key))
//   console.timeEnd('keys');
// });


//方法二：
function del(){
	console.time('keys');
  require('child_process').exec('redis-cli keys "aa:*" | xargs redis-cli del ', function(err, res) {
    if (err) {
        console.log(12,err);
    }
    console.log('res : ' + res);
    console.timeEnd('keys');
  })
}

del();

  


//添加测试数据
function set(){
	console.log(123)
	for(let i=0;i<1000000;i++){
		client.set('aa:'+i, i, function (res, reply) {
		console.log('res:',res)
		console.log('reply:',reply)
	    });
	}
}

 
// set();

 
 

