# Sublime workflow

Для работы мы используем саблайм, и в нём удобно настроить сборку по `Cmd + B` — как фронтенда, так и бэкенда.
В случае с фронтендом вызывается `gulp` (поэтому из default-таска выпилен watch, чтобы он не висел бесполезно), а в случае с бэкендом просто перезапускается node-приложение.

## Настройка билда

Надо зайти в `Project -> Edit project` и в открывшемся конфиге добавить ключ `"build_systems"`:

```json
{
	"folders":
	[
		{
			"path": "../ithank",
			"folder_exclude_patterns": ["design", "legacy", "node_modules"],
			"file_exclude_patterns": [""]
		}
	],
	"build_systems": 
	[
		{
			"name": "Compile frontend & start node",
			"path": "/bin:/usr/bin/:/usr/local/bin/",
			"working_dir": "${project_path}/../ithank",
			"cmd": ["gulp; npm start"],
			"selector": "source",
			"shell": true
		}
	]
}
```

При первом использовании нужно выбрать правильную билд-систему в меню `Tools -> Build system -> Compile frontend & start node`.

### Особенности

* В `name` — имя билд-системы, которое будет показываться в меню.
* В `path` указывается путь к gulp или вызываемым командам, т.к. саблайм не выполняет `.bash_profile` (или что там у вас в ОС) при запуске шелла.
* В `working_dir` указывается текущий рабочий каталог. В `${project_path}` хранится путь к файлу `*.sublime-project`. У меня `working_dir` такой странный, потому что файл настроек проекта лежит в `~/projects/.sublime/`, а проект в `~/projects/ithank`.
* В `cmd` шел-команды.
* В `selector` непонятно что. В зависимости от этого саблайм выбирает систему для билда.


## Возмущение

Саблайм кривой, поэтому не получается заставить работать `variants` в `build_systems` так, как хотелось бы.
Из-за этого пришлось сделать один билд-таск с 2 командами.

В будущем, когда фронтенд растолстеет, это придётся пересмотреть или вернуться к использованию `gulp watch`.

## Ссылки
* [Sublime Build Systems Reference](http://docs.sublimetext.info/en/latest/reference/build_systems.html)
* [Sublime Build Systems](http://docs.sublimetext.info/en/latest/file_processing/build_systems.html)