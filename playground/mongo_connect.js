const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        console.log('Unable to connect the Mongodb server');
        return;
    }
    console.log('connect to the Mongodb server');

    const db = client.db('TodosApp');

    //create an collection named Todos and insert an data into
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Unable to insert Todos', err);
    //         return;
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    //create an collection named Users and insert an data into
    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'philadelphia'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert Users', err);
            return;
        }
        console.log(result.ops);
    });

    client.close();
});