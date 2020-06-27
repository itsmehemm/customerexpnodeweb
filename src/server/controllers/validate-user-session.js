const { VALIDATE_USER_SESSION_CONTROLLER } = require('../lib/constants/logging-constants');

const validateUserSession = (req, res, next) => {
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `Validating user session for web request`);
    if (req && req.session && req.session.sessionId) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Session found: ${JSON.stringify(req.session)}`);
        req.user = req.session.user;
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Proceeding with the existing session.`);
        return next();
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `No session found.`);
    // logic to allow anonymous session or redirect to home page
    return next();
};

module.exports = validateUserSession;