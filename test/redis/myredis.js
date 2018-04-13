const Redis = require('ioredis');
const ConnectRedis = require('connect-redis');
const config = {}; // your ioredis config
const clients = {};

/**
 * @private create redis client
 * @param {string} name client name
 * @param {boolean} isSession is this the application session client or not
 * @return {Redis|*}
 */
const createClient = (name, isSession = false) => {
  let client;
  client = new Redis({...config, "keyPrefix":`${name}:`)});
  client.on('error', msg => console.log("Redis Client[" + name + "]: " + msg));
  client.on('connect', () => console.log("Redis Client[" + name + "]: Connected"));
  if (isSession) {
    const RedisStore = ConnectRedis(isSession);
    client = new RedisStore({client});
  }
  return client;
};

/**
 * Create or get redis client
 * @param {string} name client name
 * @return {Redis|*}
 */
const getClient = name => {
  let client = clients[name];
  if (!client || !client.connected) {
    client = clients[name] = createClient(name);
  }
  return client;
};

/**
 * get keys only related to this client prefix
 * @param name
 */
const getClientKeys = name => getClient(name).keys(`${name}:*`).then(keys => keys.map(key => key.substr(name.length + 1)));

/**
 * clear client
 * @param name
 */
const clearClient = name => getClientKeys(name).then(keys => {
  const client = getClient(name);
  client && keys.forEach(key => client.del(key))
});

module.exports = {getClient, clearClient, getClientKeys};
