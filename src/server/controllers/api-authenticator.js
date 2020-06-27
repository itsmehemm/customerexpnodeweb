const facebookOAuth = require('../oauth/facebook.js');
const {
    API_AUTHENTICATOR
} = require('../lib/constants/logging-constants');
const {
    TINNAT_WEB_GUEST,
    TINNAT_WEB_GUEST_KEY,
    TINNAT_WEB,
    TINNAT_FACEBOOK_OAUTH,
    ADMIN_USER,
    ADMIN_USER_KEY,
    X_TINNAT_SECURITY_CONTEXT
} = require('../lib/constants');

const apiAuthenticator = async (req, res, next) => {
    console.log(API_AUTHENTICATOR, `Authenticating API request: ${req.method}: ${req.url}`);
    const securityContext = JSON.parse(req.headers && req.headers[X_TINNAT_SECURITY_CONTEXT] || '{}');
    console.log(API_AUTHENTICATOR, `security context received: ${JSON.stringify(securityContext)}`);
    if (securityContext.userId === ADMIN_USER && securityContext.key === ADMIN_USER_KEY) {
        console.log(API_AUTHENTICATOR, `GET and POST Authorized user: ${securityContext.userId}`);
        return next();
    }
    if (req.method === 'GET' && securityContext.userId === TINNAT_WEB_GUEST && securityContext.key === TINNAT_WEB_GUEST_KEY) {
        console.log(API_AUTHENTICATOR, `GET Authorized user: ${securityContext.userId}`);
        return next();
    }
    if (securityContext.client_id === TINNAT_WEB) {
        if (securityContext.login_provider === TINNAT_FACEBOOK_OAUTH) {
            const userAccessToken = securityContext.facebook && securityContext.facebook.access_token;
            const user = await facebookOAuth.authenticate(userAccessToken);
            if (user) {
                req.user = user;
                return next();
            }
        }
    }
    console.log(API_AUTHENTICATOR, `User not authorized: ${JSON.stringify(securityContext)}`);
    return res.status(401).send({
        error: {
            message: 'UNAUTHORIZED REQUEST',
            description: 'You don\'t have permission to access this resource.'
        }
    })
};

module.exports = apiAuthenticator;