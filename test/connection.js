var Hapi = require('hapi');
var assert = require('assert');

var redisPlugin = require('../');

describe('Hapi server', function() {

  //Need to test option parsing works... and so so much more

  it('should be able to register plugin default options', function(done) {
    var server = new Hapi.Server();
    server.register({
      register: redisPlugin
    }, function () {
      assert(server.plugins['hapi-redis'].client,'no redis client was returned');
      server.plugins['hapi-redis'].client.ping(function(err, res){
        assert.equal(res, 'PONG', "didn't get a pong for our ping")
        done()
      })
    });
  });
  it('should throw error if redis connection fails', function(done) {
    var server = new Hapi.Server();
    server.register({
      register: redisPlugin,
      options: {
        host: 'invalid'
      }
    }, function (err) {
      assert(err instanceof Error, 'No error thrown for failed connection')
      done()
    });
  });
});
