var redis = require('redis');
var redisClientFactory = require('basic-redis-factory');

exports.register = function (server, options, next) {

  options = options || {};

  var redisClient = redisClientFactory(redis, options);

  redisClient.on("error", function(err){
    server.log([ 'hapi-redis', 'error' ], err.message)
  })

  redisClient.on("ready", function(){
    server.log([ 'hapi-redis', 'info' ], 'redisClient connection created');
    next();
  })

  server.expose('client', redisClient);

};

exports.register.attributes = {
  pkg: require('./package.json'),
  multiple: true
};
