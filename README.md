[![Build Status](https://secure.travis-ci.org/sandfox/node-hapi-redis.png)](http://travis-ci.org/sandfox/node-hapi-redis)
[![Dependencies Status](https://david-dm.org/sandfox/node-hapi-redis.png)](https://david-dm.org/sandfox/node-hapi-redis)
[![DevDependencies Status](https://david-dm.org/sandfox/node-hapi-redis/dev-status.png)](https://david-dm.org/sandfox/node-hapi-redis#info=devDependencies)

# Hapi-Redis

This is a plugin to share a common redis connection across the whole Hapi server.

__This version is intended for use with hapi v8.x.x__

__If you are looking for a version that works with hapi v7.x.x then please use version 1.x.x__

__As of 3.x.x it is now possible to register this plugin multiple times__

__As of 4.x.x it is now possible to supply a connection string as the `option`__

__As of 4.x.x `redis` is now a peer dependency (0.12.x) to allow users more freedom with redis versions__



## Usage

The `options` are passed through to [basic-redis-factory](https://github.com/sandfox/node-basic-redis-factory/tree/v0.0.3#api) as the 2nd argument. The relevant part of the docs are reproduced here for ease of reference:

options can either be a url connection string (i.e `redis://user:password@127.0.0.1:6379`) or an object.

if options is an object then the factory will look for the following keys on the object
and fallback to defaults for any missing values (host: `127.0.01`, port: `6379`, no authentication).

- `url` : a url connection string.
- `host`: the host to connect to.
- `port`: the port to connect to.
- `password`: the password to authenticate with, if not supplied then no auth will applied.
- `opts`: an options object as expected by [`redis.createClient`](https://github.com/mranney/node_redis#rediscreateclient).

If `opts.url` is supplied then `opts.host`, `opts.port`, and `opts.password` keys will be ignored.

If you wish to use `hiredis` then just 
```
npm install -save hiredis
```
and this module will automatically use it (unless you override that with the `parser` option)

One object is exposed by this plugin :

- `client` : connection object to the redis instance


## Example

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
