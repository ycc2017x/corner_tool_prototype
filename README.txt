ssh keys: yourCorner7ooL

binami pass: FTbI0a3qVnKC

To access the mongo shell you may need to kill mongo.lock in /var/lib/mongod
Make sure you start mongod and then start the mongo app, then you can use the shell. Database data exists in /data/db/,

to start the mongo shell, type `mongo app` in the tool_app directory


1. remove mongo.lock
2. sudo killall mongod
3. mongod
4. mongo app in <app directory>
5. nodemon app
