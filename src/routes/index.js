const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const config = require('../lib/config.json');
const api = require('./api');
const validateUserSession = require('../controllers/validate-user-session');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(cookieParser());

app.use('/static', express.static(path.resolve(__dirname, '../../', 'build/static')));

app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(validateUserSession);

const { apiAuthenticator } = require('../controllers');

app.use('/api', apiAuthenticator);

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'));
});

module.exports = app;
