const { VALIDATE_USER_SESSION_CONTROLLER } = require('../lib/constants/logging-constants');
const {
    isAPIRequest,
    isGuestRequestAllowed
} = require('../lib/utils');

const validateUserSession = (req, res, next) => {
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `validating user session for request: ${req.url}`);
    if (isAPIRequest(req)) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `API request received`);
        return next();
    }
    if (req && req.session && req.session.sessionId) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `session found: ${JSON.stringify(req.session)}`);
        req.user = req.session.user;
        return next();
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `no session found.`);
    if (isGuestRequestAllowed(req)) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `guest request allowed.`);
        return next();
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `guest request not allowed. redirecting to home page`);
    return res.redirect('/');
};

module.exports = validateUserSession;