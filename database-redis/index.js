const redis = require("redis");

const client = redis.createClient(5002, "127.0.0.1");

client.on("connect", function() {
  console.log("Redis client connected");
});

client.on("error", function(err) {
  console.log("Something went wrong " + err);
});


module.exports = client;