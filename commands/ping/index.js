var ping = function(socket, command, args){
    socket.write('Pong!\r\n');
};

module.exports = ping;
