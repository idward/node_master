const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        console.log('Unable to connect the Mongodb server');
        return;
    }
    console.log('connect to the Mongodb server');

    const db = client.db('TodosApp');

    db.collection('Todos').find({completed: false}).toArray().then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, err => {
        console.log('Unable to fetch todos', err);
    });

    client.close();
});