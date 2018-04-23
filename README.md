# tool_app
Your Corner tool now turning into a full stack app

ssh keys: yourCorner7ooL

binami pass: FTbI0a3qVnKC
user:riley pwd: pass
aws mongo creds:
user: app password: $cotT7719

To access the mongo shell you may need to kill mongo.lock in /var/lib/mongod
Make sure you start mongod and then start the mongo app, then you can use the shell. Database data exists in /data/db/,

to start the mongo shell, type `mongo app` in the tool_app directory


Whenever updating the site make sure to restart the daemon with `forever restart app.js` in /apps/tool_app/
Whenever modifying the database also make sure to restart the db on AWS with the ctl script, can be found in pt 2 of AWS deployment tutorial 

1. remove mongo.lock
2. sudo killall mongod
3. mongod
4. mongo app in <app directory>
5. nodemon app
