var Twitter = require('twitter');
var env = require('./environment.js');

var client = new Twitter(env);
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

client.stream('statuses/filter', { track: 'trump' }, function (stream) {
    stream.on('data', function (tweet) {
        io.emit('tweet', tweet);
    });

    stream.on('error', function (error) {
        console.log(error);
    });
});