var redis = require('redis');


exports.register = function (plugin, options, next) {

  options = options || {};

  options.port = options.port || 6379;
  options.host = options.host || "127.0.0.1";
  options.opts = options.opts || null;

  var redisClient = redis.createClient(options.port, options.host, options.opts);

  if (options.password) {
    redisClient.auth(options.password)
  }

  redisClient.on("error", function(err){
    plugin.log([ 'hapi-redis', 'error' ], err.message)
  })

  redisClient.on("ready", function(){
    plugin.log([ 'hapi-redis', 'info' ], 'redisClient connection created');
    next();
  })

  plugin.expose('client', redisClient);

};

exports.register.attributes = {
  pkg: require('./package.json')
};
