const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.model');
const {User} = require('./models/user.model');

const app = express();

//recieve json data types
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        console.log(JSON.stringify(doc, undefined, 2));
        return res.send(doc);
    }, (e) => {
        return res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('The server is listening on port 3000');
});