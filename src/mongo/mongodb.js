const MongoClient = require('mongodb').MongoClient;

const connection = (closure) => {
    return MongoClient.connect('mongodb://tinnat:tinnat@tinnat-db-cluster-0-shard-00-00-4synn.mongodb.net:27017,tinnat-db-cluster-0-shard-00-01-4synn.mongodb.net:27017,tinnat-db-cluster-0-shard-00-02-4synn.mongodb.net:27017/test?ssl=true&replicaSet=tinnat-db-cluster-0-shard-0&authSource=admin&retryWrites=true&w=majority', (err, db) => {
        console.log('MONGODB: Connected to database: tinnat')
        if (err) return console.log(err);
        closure(db);
    });
};

let response = {
    status: 200,
    data: [],
    error: {}
};

const sendError = (err, res) => {
    response.status = 501;
    response.error = {
        message: typeof err === 'object' ? err.message : err
    };
    res.status(501).json(response);
};

module.exports = {
    connection: connection,
    sendError: sendError
};