"use strict";

var redis = require('redis');
var redisClientFactory = require('basic-redis-factory');

exports.register = function (server, options, next) {

  options = options || {};

  var redisClient = redisClientFactory(redis, options);

  /**
   * error handler for errors after initial connection has been established
   * @param {Error} err is the error thrown
   * @return {null}
   */
  var defaultErrorHandler = function(err) {
    server.log([ 'hapi-redis', 'error' ], err.message);
  };

  var initialErrorHandler = function(err) {
    server.log([ 'hapi-redis', 'error' ], err.message);
    next(err);
    redisClient.end();
  };

  redisClient.on('error', initialErrorHandler);

  redisClient.on("ready", function(){
    server.log([ 'hapi-redis', 'info' ], 'redisClient connection created');

    // change the error handler to simply log errors
    redisClient.removeListener('error', initialErrorHandler);
    redisClient.on('error', defaultErrorHandler);
    next();
  });

  server.expose('client', redisClient);
  server.expose('library', redis);

};

exports.register.attributes = {
  pkg: require('./package.json'),
  multiple: true
};
