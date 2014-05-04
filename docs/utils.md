# Особенности, которые полезно знать

## Симлинки

Для папки `server` создан симлинки в `node_modules` (остальные модули по прежнему в гитигноре), так что можно писать так:

```javascript
require('server/config');
```

```javascript
require('server/controllers/thank')(app, config);
```