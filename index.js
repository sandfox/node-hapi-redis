var redis = require('redis');


exports.register = function (server, options, next) {

  options = options || {};

  options.port = options.port || 6379;
  options.host = options.host || "127.0.0.1";
  options.opts = options.opts || null;

  var redisClient = redis.createClient(options.port, options.host, options.opts);

  if (options.password) {
    redisClient.auth(options.password)
  }

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
