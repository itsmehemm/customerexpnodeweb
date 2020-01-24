const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(cookieParser());

const api = require('./api');

const { apiAuthenticator } = require('../controllers');

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

app.use('/api', apiAuthenticator);

app.use('/api', api);

module.exports = app;
