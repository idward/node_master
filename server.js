const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

//hbs
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('scremIt', (text) => {
    return text.toString().toUpperCase();
});
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
//template engine
app.set('view engine', 'hbs');

//middleware for routing
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Can\'t to append server.log');
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render('maintenance');
});
//middleware for setting up public folder
app.use(express.static(path.join(__dirname, 'public')));
//route
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Hello World!!!',
        welcomeMessage: 'welcome to my real world.'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Us'
    });
});
//server starts up
app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});