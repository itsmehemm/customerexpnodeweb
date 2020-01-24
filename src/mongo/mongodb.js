const MongoClient = require('mongodb').MongoClient;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/tinnat', (err, db) => {
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