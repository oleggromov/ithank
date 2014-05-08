start:
	ITHANK_ENV=development node server/app.js

connect:
	mongod --pidfilepath ./mongod.pid &

disconnect:
	cat mongod.pid | xargs kill
	rm mongod.pid