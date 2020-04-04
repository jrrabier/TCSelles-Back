const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:8080';
const dbName = 'TCSelles';

const client = new MongoClient(url);

client.connect((err) => {
    assert.equal(null, err);
    console.log('Connecté au serveur avec succès !');
    
    const db = client.db(dbName);

    removeUser(db, () => {
        findUsers(db,() => {
            client.close();
        });
    });
});

const insertUsers = (db, callback) => {
    const collection = db.collection('users');

    collection.insertMany([
        {
            login: 'jrmrabier@gmail.com',
            psw: 'Jslc27142804*',
            first_name: 'Jérôme',
            last_name: 'Rabier'
        },
        {
            login: 's.rabier88@gmail.com',
            psw: 'Jetaime03',
            first_name: 'Stéphanie',
            last_name: 'Rabier'
        },
        {
            login: 'coudray.chantal@orange.fr',
            psw: 'Password1',
            first_name: 'Chantal',
            last_name: 'Coudray'
        }
    ], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("3 users insérés dans la collection");
        callback(result);
    });
}

const findUsers = (db, callback) => {
    const collection = db.collection('users');

    collection.find({'login': 'jrmrabier@gmail.com'}).toArray((err, users) => {
        assert.equal(err, null);
        console.log("Enregistrements trouvés :");
        console.log(users);
        callback(users);
    });
}

const updateUser = (db, callback) => {
    const collection = db.collection('users');

    collection.updateOne({login: 'jrmrabier@gmail.com'}
    , {$set: {classement: '15/4'}},(err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("User mis à jour");
        callback(result);
    });
}

const removeUser = (db, callback) => {
    const collection = db.collection('users');

    collection.deleteOne({login: 'jrmrabier@gmail.com'}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("user bien supprimé");
        callback(result);
    });
}