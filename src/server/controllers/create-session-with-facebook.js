const uniqid = require('uniqid');
const args = require('yargs').argv;
const facebookOAuth = require('../oauth/facebook');
const config = require('../lib/config.json');
const { CREATE_SESSION_WITH_FACEBOOK_CONTROLLER } = require('../lib/constants/logging-constants');
const {
    TINNAT_FACEBOOK_OAUTH,
    ENVIRONMENT_PRODUCTION
} = require('../lib/constants/');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const createSessionWithFacebook = async (req, res, next) => {
    console.log(CREATE_SESSION_WITH_FACEBOOK_CONTROLLER, 'authenticating user with Facebook');
    const userAccessToken = req.query.access_token;
    console.log(CREATE_SESSION_WITH_FACEBOOK_CONTROLLER, `fb user access token': ${userAccessToken}`);
    const user = await facebookOAuth.authenticate(userAccessToken);
    if (user) {
        req.user = user;
        req.session.userId = user.accountNumber;
        req.session.user = user;
        req.session.sessionId = uniqid('SESSION-').toUpperCase();
        req.session.startTime = new Date();
        req.session.loginProvider = TINNAT_FACEBOOK_OAUTH;
        const redirectUrl = req.query.redirect_url || config.tinnat[environment].url.login_success;
        return res.redirect(redirectUrl);
    }
    const errorUrl = req.query.error_url || config.tinnat[environment].url.login_failure;
    return res.redirect(errorUrl);
};

module.exports = createSessionWithFacebook;