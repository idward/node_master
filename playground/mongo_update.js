const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        console.log('Unable to connect the Mongodb server');
        return;
    }
    console.log('connect to the Mongodb server');

    const db = client.db('TodosApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bb180d4c7766b7ab28cb33a')
    }, {
        $set: {completed: true}
    }, {
        returnOriginal: false
    }).then(result => {
        console.log(result);
    });

    client.close();
});