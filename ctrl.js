var daemon = require('daemonize2').setup({
    main: "start.js",
    name: "ravert",
    pidfile: "pids/ravert.pid"
});

daemon
    .on('starting', function() {
        console.log('Starting ravert...');
    })
    .on('started', function(pid) {
        console.log('ravert started. PID: ' + pid);
    })
    .on('stopping', function() {
        console.log('Stopping ravert...');
    })
    .on('stopped', function(pid) {
        console.log('ravert stopped.');
    })
    .on('running', function(pid) {
        console.log('ravert already running. PID: ' + pid);
    })
    .on('notrunning', function() {
        console.log('ravert is not running');
    })
    .on('error', function(err) {
        console.log('ravert failed to start:  ' + err.message);
    });

switch (process.argv[2]) {
    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;

    case "kill":
        daemon.kill();
        break;

    case "restart":
        daemon.stop(function(err) {
            daemon.start();
        });
        break;

    case "status":
        var pid = daemon.status();
        if (pid)
            console.log("ravert running. PID: " + pid);
        else
            console.log("ravert is not running.");
        break;

    default:
        console.log("Usage: [start|stop|kill|restart|status]");
}
