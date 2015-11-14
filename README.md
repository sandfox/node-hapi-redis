[![Build Status](https://secure.travis-ci.org/sandfox/node-hapi-redis.png)](http://travis-ci.org/sandfox/node-hapi-redis)
[![Dependencies Status](https://david-dm.org/sandfox/node-hapi-redis.png)](https://david-dm.org/sandfox/node-hapi-redis)
[![DevDependencies Status](https://david-dm.org/sandfox/node-hapi-redis/dev-status.png)](https://david-dm.org/sandfox/node-hapi-redis#info=devDependencies)

# Hapi-Redis

This is a plugin to share a common redis connection across the whole Hapi server.

__This version is intended for use with hapi v8.x.x__

__If you are looking for a version that works with hapi v7.x.x then please use version 1.x.x__

__As of 3.x.x it is now possible to register this plugin multiple times__

__As of 4.x.x it is now possible to supply a connection string as the `option`__

~~__As of 4.x.x `redis` is now a peer dependency (0.12.x) to allow users more freedom with redis versions__~~

__As of 5.x.x we've scrapped redis as a peer deps__

__With 6.x.x the `options` object has changed it's signature__

## Registering the plugin

Options:
- `redisLibrary`:  passing in a `redis` module to override the one bundled with this module. optional.
- `connection`: an object or string that is passed through to [basic-redis-factory](https://github.com/sandfox/node-basic-redis-factory/tree/v0.0.3#api) as the 2nd argument. The relevant part of the docs are reproduced here for ease of reference:

`connection` can either be a url connection string (i.e `redis://user:password@127.0.0.1:6379`) or an object.

if `connection` is an object then the factory will look for the following keys on the object
and fallback to defaults for any missing values (host: `127.0.01`, port: `6379`, no authentication).

- `url` : a url connection string.
- `host`: the host to connect to.
- `port`: the port to connect to.
- `password`: the password to authenticate with, if not supplied then no auth will applied.
- `opts`: an options object as expected by [`redis.createClient`](https://github.com/mranney/node_redis#rediscreateclient).

If `opts.url` is supplied then `opts.host`, `opts.port`, and `opts.password` keys will be ignored.

If you wish to use the `hiredis` parser then just:
```
npm install -save hiredis
```
and this module will automatically use it (unless you override that with the `parser` option).

The registration of this plugin will only complete on either succesful connection to the redis instance or an error.

## Using the plugin

Two objects are exposed by this plugin :

- `client` : a redis client connection object that is connected to the redis instance
- `library`: the redis module used by this module

## Example

```js
var Hapi = require("hapi");

var myPluginOpts = {
    connection: {
        "host": "localhost"
        "opts": {
            "parser": "javascript"
        }
    }
};

var server = new Hapi.Server(8080);

server.pack.register({
    register: require('hapi-redis'),
    options: myPluginOpts
}, function () {

});

server.route( {
    "method"  : "GET",
    "path"    : "/stats",
    "handler" : usersHandler
});

function usersHandler(request, reply) {
    var redisClient = request.server.plugins['hapi-redis'].client;

    // Do something with the redis client
    // reply(result);
};

server.start(function() {
    console.log("Server started at " + server.info.uri);
});
```
