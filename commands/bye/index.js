var bye = function(socket, command, args){
    var force = args[0] != null && args[0] == 'force';

    if(force){
        socket.destroy();
    } else {
        socket.end('BYE\r\n');
    }
};

module.exports = bye;
