connect:
	mongod --pidfilepath ./mongod.pid &

disconnect:
	cat mongod.pid | xargs kill
	rm mongod.pid