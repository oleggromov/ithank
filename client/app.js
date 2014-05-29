// Вся логика в главной вьюшке.
var AppView = require('client/views/app.js');
var app = new AppView;

// Запускаем слежение за hashChange и делаем это «тихо», т.к. сервер отдаёт уже отрендеренную страницу
// и реагировать на первый урл нет необходимости.
Backbone.history.start({ 
	pushState: true,
	silent: true
});