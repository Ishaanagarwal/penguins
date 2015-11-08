var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client/js'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });
    
    client.on('send', function(data) {
        client.emit('message', data);
        client.broadcast.emit('message', data);
    });
});

server.listen(process.env.PORT);