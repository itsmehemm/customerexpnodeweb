const uniqid = require('uniqid');
const userserv = require('tinnat-userserv');
const args = require('yargs').argv;
const facebookOAuth = require('../oauth/facebook.js');
const errorConstants = require('../lib/constants/error-constants');
const {
    API_AUTHENTICATOR
} = require('../lib/constants/logging-constants');
const {
    TINNAT_WEB,
    TINNAT_FACEBOOK_OAUTH,
    ADMIN_USER,
    ADMIN_USER_KEY,
    X_TINNAT_SECURITY_CONTEXT,
    ENVIRONMENT_PRODUCTION
} = require('../lib/constants');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const apiAuthenticator = async (req, res, next) => {
    console.log(API_AUTHENTICATOR, `authenticating API request: ${req.method}: ${req.url}`);
    const session = req && req.session;
    const securityContext = JSON.parse(req && req.headers && req.headers[X_TINNAT_SECURITY_CONTEXT] || '{}');
    console.log(API_AUTHENTICATOR, `session: ${JSON.stringify(session)}`);
    console.log(API_AUTHENTICATOR, `security context: ${JSON.stringify(securityContext)}`);
    if (session && session.sessionId) {
        console.log(API_AUTHENTICATOR, `api request authenticated with session`);
        req.user = session.user;
        return next();
    }
    if (environment !== ENVIRONMENT_PRODUCTION && securityContext.userId === ADMIN_USER && securityContext.key === ADMIN_USER_KEY) {
        console.log(API_AUTHENTICATOR, `[development only] GET and POST Authorized user: ${securityContext.userId}`);
        req.user = {
            name: 'TEST TEST',
            email: 'hemanthprasathmurali@gmail.com',
            accountType: 'ADMIN',
            authenticationParty: 'TEST',
            accountId: '123456789'
        };
        req.session.user = req.user;
        req.session.sessionId = uniqid('SESSION-').toUpperCase();
        req.session.startTime = new Date().getTime();
        return next();
    }
    if (securityContext.client_id === TINNAT_WEB) {
        if (securityContext.login_provider === TINNAT_FACEBOOK_OAUTH) {
            const userAccessToken = securityContext.facebook && securityContext.facebook.access_token;
            const user = await facebookOAuth.authenticate(userAccessToken);
            if (user) {
                const tinnatUser = {
                    name: user.name,
                    email: user.email,
                    party_id: user.accountNumber,
                    account_type: PERSONAL_ACCOUNT
                };
                const response = await userserv.createFacebookUser(tinnatUser);
                if (response && response.data) {
                    req.user = {
                        name: response.data.name,
                        email: response.data.email,
                        accountType: response.data.account_type,
                        authenticationParty: response.data.authentication_party,
                        accountId: response.data.account_id
                    };
                    req.session.user = req.user;
                    req.session.sessionId = uniqid('SESSION-').toUpperCase();
                    req.session.startTime = new Date().getTime();
                    return next();
                }
            }
        }
    }
    console.log(API_AUTHENTICATOR, `user not authorized: ${JSON.stringify(securityContext)}`);
    return res.status(401).send({
        error: {
            ...errorConstants.UNAUTHORIZED_REQUEST
        }
    });
};

module.exports = apiAuthenticator;