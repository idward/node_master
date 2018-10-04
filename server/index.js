require('./config/config');

const express = require('express');
const path = require('path');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./models/todo.model');
const {User} = require('./models/user.model');
const {authenticate} = require('./middleware/authenticate/authenticate');

const app = express();

const port = process.env.PORT;

//recieve json data types
app.use(bodyParser.json());

//post todo data to database
app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(doc => {
        console.log(JSON.stringify(doc, undefined, 2));
        return res.send(doc);
    }, (e) => {
        return res.status(400).send(e);
    });
});
//get todo collection data from database
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then(todos => {
        return res.send({todos});
    }, (e) => {
        return res.status(400).send(e);
    });
});
//get single todo data from databse
app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!id || !ObjectID.isValid(id)) {
        return res.status(404).send({message: 'ID is invalid'});
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send({message: 'todo you looking for is not existing'});
        }
        res.send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});
//delete single todo data from database
app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!id || !ObjectID.isValid(id)) {
        return res.status(404).send({message: 'ID is invalid'});
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send({message: 'todo you deleting is not exsiting'});
        }

        res.send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});
//update single todo data from database
app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!id || !ObjectID.isValid(id)) {
        return res.status(404).send({message: 'ID is invalid'});
    }

    const body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(JSON.parse(body.completed)) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then(todo => {
        if (!todo) {
            return res.status(404).send({message: 'Todo you updating is not exist'});
        }

        res.send({todo});
    }).catch(e => {
        res.status(400).send(e);
    });
});
//post user to database
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then(token => {
        let userInfo = user.convertToJSON();
        return res.header('x-auth', token).send(userInfo);
    }).catch(e => {
        res.status(400).send(e);
    });
});
//get user from database
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});
//user login
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredientials(body.email, body.password)
        .then(user => {
            user.generateAuthToken().then(token => {
                let userInfo = user.convertToJSON();
                res.header('x-auth', token).send(userInfo);
            });
        })
        .catch(e => {
            res.status(400).send({message: e.message});
        });
});
//user logout
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.send({message: 'Token remove successfully'});
    }).catch(e => {
        res.status(400).send(e);
    });
});

//server starts up
app.listen(port, () => {
    console.log('The server is listening on port 3000');
});