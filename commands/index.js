var enabled = [
    'ping',
    'bye'
];

var commands = {};
enabled.forEach(function(command){
    commands[command] = require('./' + command);
});

module.exports = commands;
