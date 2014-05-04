start:
	echo '' > .pid-node
	mongod --pidfilepath ./.pid-mongo &> mongo.log &
	NODE_ENV=development node app/app.js &> /dev/null &

stop:
	cat .pid-mongo | xargs kill
	cat .pid-node | xargs kill
	rm .pid-*