## Настройки

В папке `config` живут различные настройки:

* непосредственно приложения, в зависимости от окружения;
* `express`;
* роутинг: улр --> котроллер;
* каких-то других модулей (например, passport.js).


```js
// вернет объект с настройками
// характерными для dev-окружения
var config = require('server/config/app')({
    env: 'development'
})

// настроит express
require('server/config/express')({
    config: {...}
    app: require('express')()
})

// настроит роутинг
require('server/config/routes')({
    config: {...}
    app: require('express')()
})
```

Можно выполнить все сразу:

```js
// настроить express, роутинг, ...
require('server/config', {
    config: {...}
    app: require('express')()
})
```
