const args = require('yargs').argv;
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants');
const { VALIDATE_USER_SESSION_CONTROLLER } = require('../lib/constants/logging-constants');
const {
    isAPIRequest,
    isGuestRequestAllowed,
    checkUserWebPermission
} = require('../lib/utils');
const environment = args.env || ENVIRONMENT_PRODUCTION;
const WOWO_DEV_INJECT_TEST_USER = args.WOWO_DEV_INJECT_TEST_USER;

const validateUserSession = (req, res, next) => {
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `validating user session for request: ${req.url}`);
    if (isAPIRequest(req)) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `API request received`);
        return next();
    }
    if (req && req.session && req.session.sessionId) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `session found: ${JSON.stringify(req.session)}`);
        req.user = req.session.user;
        if (checkUserWebPermission(req)) {
            console.log(VALIDATE_USER_SESSION_CONTROLLER, `user has permission to resource: ${req.url}`);
            return next();
        } else {
            console.log(VALIDATE_USER_SESSION_CONTROLLER, `user does not has permission to resource: ${req.url}`);
            return res.redirect('/notfound');
        }
    } else {
        if (isGuestRequestAllowed(req)) {
            console.log(VALIDATE_USER_SESSION_CONTROLLER, `guest request allowed`);
            return next();
        }
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `guest request not allowed`);
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `WOWO_DEV_INJECT_TEST_USER:${WOWO_DEV_INJECT_TEST_USER}`);
        if (environment !== ENVIRONMENT_PRODUCTION && WOWO_DEV_INJECT_TEST_USER === true) {
            console.log(`[development only] allowing user in development mode only. not setting session. session will be set by API request`);
            return next();
        }
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `redirecting to login page`);
    return res.redirect('/login');
};

module.exports = validateUserSession;