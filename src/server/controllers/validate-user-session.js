
const { VALIDATE_USER_SESSION_CONTROLLER } = require('../lib/constants/logging-constants');
const uniqid = require('uniqid');

const validateUserSession = (req, res, next) => {
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `Validating user session for web request`);
    if (req && req.session && req.session.sessionId) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Session found: ${JSON.stringify(req.session)}`);
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Proceeding with the existing session.`);
        return next();
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `No session found. Creating and injecting a new one.`);
    req.session.userId = 'GUEST';
    req.session.sessionId = uniqid('SESSION-').toUpperCase();
    req.session.startTime = new Date();
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `New session object created and injected: ${JSON.stringify(req.session)}`);
    return next();
};

module.exports = validateUserSession;