var net = require('net');
var commands = require('./commands');

var server = net.createServer(function(socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    var log = function(){
        var args = arguments;
        var name = args[0].name;
        args[0] = '[' + name + ']';

        console.log.apply(this, args);
    };

    log(socket, 'connected');
    socket.on('close', function(){
        log(socket, 'disconnected');
    });

    socket.on('data', function(data){
        data = data.toString().trim();

        if(!data){
            socket.write('ERROR 1 No command specified\r\n');
            return;
        }

        var args = data.split(' ');
        var command = args.shift().toLowerCase();

        if(commands.hasOwnProperty(command)){
            log(socket, 'received command', command, 'with args:', args);
            commands[command](socket, command, args);
        } else {
            socket.write('ERROR 2 Invalid command\r\n');
        }
    });
});

var port = process.env.PORT || 7000;
var host = process.env.HOST || '127.0.0.1';
server.listen(port, host, function() {
    console.log('Listening on ' + host + ':' + port);
});
