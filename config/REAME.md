### Настройки

В папке `config` живут различные настройки:

* непосредственно приложения, в зависимости от окружения;
* `express`;
* роутинг: улр --> котроллер;
* каких-то других модулей (например, passport.js).


```
// вернет объект с настройками
// характерными для dev-окружения
var config = require('config/app')({
    env: 'development'
})

// настроит express
require('config/express')({
    config: {...}
    app: require('express')()
})

// настроит роутинг
require('config/routes')({
    config: {...}
    app: require('express')()
})
```

Можно выполнить все сразу:

```
// настроить express, роутинг, ...
require('config', {
    config: {...}
    app: require('express')()
})
```