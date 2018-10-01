const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        console.log('Unable to connect the Mongodb server');
        return;
    }
    console.log('connect to the Mongodb server');

    const db = client.db('TodosApp');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(result => {
    //     console.log(result);
    // });
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => {
    //     console.log(result);
    // });
    db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
        console.log(result);
    });

    client.close();
});