/**
 * Created by Khue on 25/6/2015.
 */
var Hapi = require('hapi');
var Path = require('path');
// Create a server with a host and port
//var server = new Hapi.Server();
//server.connection({
//    host: 'localhost',
//    port: 8000
//});

// Add the route
var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'app')
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
        reply.file('/html/view1.html');
    }
});

// Start the server
server.start(function() {
    console.log('Server started ', server.info.uri);
});