start:
	echo '' > .pid-node
	mongod --pidfilepath ./.pid-mongo &> mongo.log &
	ITHANK_ENV=development node server/app.js &> /dev/null &

stop:
	cat .pid-mongo | xargs kill
	cat .pid-node | xargs kill
	rm .pid-*