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

  //Need to test option parsing works... and so so much more

  it('should be able to register plugin default options', function(done) {
    server.pack.register({
      plugin: require('../')
    }, function () {
      assert(server.pack.plugins['hapi-redis'].client,'no redis client was returned');
      server.pack.plugins['hapi-redis'].client.ping(function(err, res){
        assert.equal(res, 'PONG', "didn't get a pong for our ping")
        done()
      })
    });
  });
});
