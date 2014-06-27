var Hapi = require('hapi');
var assert = require('assert');

describe('Hapi server', function() {
  var server = null;

  beforeEach(function() {
    server = new Hapi.Server();
  });

  afterEach(function () {
    server = null;
  });

  //Need to test option parsing works...

  it('should be able to register plugin default options', function(done) {
    server.pack.register({
      plugin: require('../')
    }, function () {
      console.log( server.pack.plugins['hapi-redis'].client)
      assert(server.pack.plugins['hapi-redis'].client,'no redis client was returned');
      assert(server.pack.plugins['hapi-redis'].client.port == 6379, 'connected to incorrect port');
      assert(server.pack.plugins['hapi-redis'].client.host == '127.0.0.1', 'connected to incorrect host');
      done();
    });
  });
});
