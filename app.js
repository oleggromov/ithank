var path = require('path');
var fs = require('fs');

var env = process.env.ITHANK_ENV;
var port = process.env.ITHANK_PORT || 3000;

// запускаем приложение
require(path.resolve(process.cwd(), 'server/app.js'))(env, port);

// Сообщаем PID во внешний мир
fs.writeFile(path.resolve(process.cwd(), 'run/node.pid'), process.pid);