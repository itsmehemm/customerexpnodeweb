const facebookOAuth = require('../oauth/facebook.js');
const {
    VALIDATE_USER_SESSION_CONTROLLER
} = require('../lib/constants/logging-constants');
const {
    TINNAT_WEB,
    TINNAT_WEB_GUEST,
    TINNAT_FACEBOOK_OAUTH,
    X_TINNAT_SECURITY_CONTEXT
} = require('../lib/constants');
const uniqid = require('uniqid');

const validateUserSession = (req, res, next) => {
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `Validating user session for web request`);
    if (req && req.session && req.session.sessionId) {
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Session found: ${JSON.stringify(req.session)}`);
        req.user = req.session.user;
        console.log(VALIDATE_USER_SESSION_CONTROLLER, `Proceeding with the existing session.`);
        return next();
    }
    // web requests w/ headers (usually ajax requests)
    const securityContext = JSON.parse(req && req.headers && req.headers[X_TINNAT_SECURITY_CONTEXT] || '{}');
    if (securityContext && securityContext.client_id === TINNAT_WEB) {
        if (securityContext.login_provider === TINNAT_FACEBOOK_OAUTH) {
            const userAccessToken = securityContext.facebook && securityContext.facebook.access_token;
            const user = facebookOAuth.authenticate(userAccessToken);
            if (user) {
                req.user = user;
                req.session.userId = user.accountNumber;
                req.session.user = user;
                req.session.sessionId = uniqid('SESSION-').toUpperCase();
                req.session.startTime = new Date();
                req.session.loginProvider = TINNAT_FACEBOOK_OAUTH;
                return next();
            }
        }
    }
    console.log(VALIDATE_USER_SESSION_CONTROLLER, `No session found.`);
    // req.user = {};
    // req.session.user = {};
    // req.session.userId = 'GUEST';
    // req.session.sessionId = uniqid('SESSION-').toUpperCase();
    // req.session.startTime = new Date();
    // req.session.loginProvider = TINNAT_WEB_GUEST;
    // console.log(VALIDATE_USER_SESSION_CONTROLLER, `New session object created and injected: ${JSON.stringify(req.session)}`);
    return next();
};

module.exports = validateUserSession;