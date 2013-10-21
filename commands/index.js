var enabled = [
    'ping'
];

var commands = {};
enabled.forEach(function(command){
    commands[command] = require('./' + command);
});

module.exports = commands;
