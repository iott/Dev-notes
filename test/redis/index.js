const {getClient, clearClient} = require("./myredis");
// this will get a client with prefix "marvel:" and if it is not exists it will be created 
const client = getClient("marvel");

// set value
client.set("fav", "ironman"); 

// get the value
client.get("fav", (error, value) => console.log(value));

// clear client
clearClient("marvel");
