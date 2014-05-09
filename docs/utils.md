# Особенности, которые полезно знать

## Симлинки

Для папок `models`, `collections` созданы симлинкии в `node_modules` (остальные модули по прежнему в гитигноре), так что можно писать так:

```javascript
require('models/thank');
```

```javascript
require('controllers/thank');
```