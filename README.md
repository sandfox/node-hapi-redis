[![Build Status](https://secure.travis-ci.org/sandfox/node-hapi-redis.png)](http://travis-ci.org/sandfox/node-hapi-redis)
[![Dependencies Status](https://david-dm.org/sandfox/node-hapi-redis.png)](https://david-dm.org/sandfox/node-hapi-redis)
[![DevDependencies Status](https://david-dm.org/sandfox/node-hapi-redis/dev-status.png)](https://david-dm.org/sandfox/node-hapi-redis#info=devDependencies)

# Hapi-Redis

This is a plugin to share a common redis connection across the whole Hapi server.

__This version (>= 2.x.x) is intended for use with hapi v8.x.x__

__If you are looking for a version that works with hapi v7.x.x then please use version 1.x.x__

__As of 3.x.x it is now possible to register this plugin multiple times__

It takes 3 options :

- port: *Optional.* port to connect to (eg. `6379`),
    - defaults to `6379`
- host: *Optional.* host to connect to (eg. `127.0.0.1`),
    - defaults to `127.0.0.1`
- opts: *Optional.* Provide extra settings to the connection, see [documentation](https://github.com/mranney/node_redis#rediscreateclientport-host-options).

One object is are exposed by this plugin :

- `client` : connection object to the redis instance

Usage example :
```js
var Hapi = require("hapi");

var redisOptions = {
    "host": "localhost",
    "opts": {
        "parser": "javascript"
    }
};

var server = new Hapi.Server(8080);

server.pack.register({
    register: require('hapi-redis'),
    options: redisOptions
}, function () {

});

server.route( {
    "method"  : "GET",
    "path"    : "/stats",
    "handler" : usersHandler
});

function usersHandler(request, reply) {
    var redisClient = request.server.plugins['hapi-redis'].client;

    //Do something with thr redis client
    // reply(result);
};

server.start(function() {
    console.log("Server started at " + server.info.uri);
});
```
