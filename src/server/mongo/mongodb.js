const MongoClient = require('mongodb').MongoClient;

var dbConnector;

const connection = (closure) => {
    if (dbConnector) {
        console.log('MONGO', 'connection', 'DB Connector available.');
        return closure(dbConnector);
    } else {
        console.error('MONGO', 'connection', 'DB Connector unavailable. Requesting new connection');
        return MongoClient.connect('mongodb://tinnat:tinnat@tinnat-db-cluster-0-shard-00-00-4synn.mongodb.net:27017,tinnat-db-cluster-0-shard-00-01-4synn.mongodb.net:27017,tinnat-db-cluster-0-shard-00-02-4synn.mongodb.net:27017/test?ssl=true&replicaSet=tinnat-db-cluster-0-shard-0&authSource=admin&retryWrites=true&w=majority', (err, db) => {
            console.log('MONGO', 'connection', 'Connected to database: tinnat')
            if (err) return console.log(err);
            dbConnector = db;
            return closure(db);
        });
    }
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