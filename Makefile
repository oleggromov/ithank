start: connect
	ITHANK_ENV=development \
	node server/app.js

connect:
	[ ! -f ./mongod.pid ] && mongod --pidfilepath ./mongod.pid &

disconnect:
	cat mongod.pid | xargs kill
	rm mongod.pid