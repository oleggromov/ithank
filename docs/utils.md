# Особенности, которые полезно знать

## Симлинки

Для папок `models`, `collections` и `config` созданы симлинкии в `node_modules` (остальные модули по прежнему в гитигноре), так что можно писать так:

```javascript
require('config');
```

```javascript
require('controllers/thank');
```