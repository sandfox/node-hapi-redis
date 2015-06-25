var Hapi = require('hapi');
var assert = require('assert');

var redisPlugin = require('../');
var server = null;

describe('Hapi server', function() {

  //Need to test option parsing works... and so so much more

  it('should be able to register plugin default options', function(done) {
    server = new Hapi.Server();
    server.register({
      register: redisPlugin
    }, function () {
      assert(server.plugins['hapi-redis'].client,'no redis client was returned');

      server.plugins['hapi-redis'].client.ping(function(err, res){
        assert.equal(res, 'PONG', "didn't get a pong for our ping")
        done();
      });
    });
  });

  it('should be able to use async functions', function(done){
    server.plugins['hapi-redis'].client.pingAsync()
      .then(function(res){
        assert.equal(res, 'PONG', "didn't get a pong for our ping");
        done();
      })
      .catch(function(e){
        assert.ok(false, "Async didn't work");
        done();
      });
  });
});
