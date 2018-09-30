1. node|nodemon --inspect-brk debugger.js
2. chrome browser to type chrome://inspect/#devices
3. choose open dedicated DevTools for Node
4. debugger your application

//restart handlebar template by nodemon
nodemon appName -e .hbs,.js,.ejs

//deploy to heroku
//add public ssh key to heroku
heroku keys:add
//show ssh key
heroku keys
//remove ssh key
heroku keys:remove KEY
//create remote link for heroku
heroku create
//publish website to heroku
git push heroku
