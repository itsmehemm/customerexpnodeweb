const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const api = require('./api');
const config = require('../lib/config.json');
const {
    whoami,
    validateUserSession,
    logoutSession,
    createSessionWithFacebook,
    apiAuthenticator,
    checkUserAPIPermission,
    injectLogger
} = require('../controllers');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use(cookieParser());

app.use('/static', express.static(path.resolve(__dirname, '../../../', 'build/static')));

app.use(session({
    cookie: {
        maxAge: 1200000
    },
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false
}));

app.use(injectLogger);

app.get('/auth/facebook', createSessionWithFacebook);

app.get('/logout', logoutSession);

app.use(validateUserSession);

app.get('/whoami', whoami);

app.use('/api', apiAuthenticator, checkUserAPIPermission);

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../', 'build', 'index.html'));
});

module.exports = app;
