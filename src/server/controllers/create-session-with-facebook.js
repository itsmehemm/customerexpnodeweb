const uniqid = require('uniqid');
const userserv = require('tinnat-userserv');
const args = require('yargs').argv;
const facebookOAuth = require('../oauth/facebook');
const config = require('../lib/config.json');
const { CREATE_SESSION_WITH_FACEBOOK_CONTROLLER } = require('../lib/constants/logging-constants');
const {
    ENVIRONMENT_PRODUCTION,
    PERSONAL_ACCOUNT,
} = require('../lib/constants/');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const createSessionWithFacebook = async (req, res, next) => {
    console.log(CREATE_SESSION_WITH_FACEBOOK_CONTROLLER, 'authenticating user with Facebook');
    const userAccessToken = req.query.access_token;
    console.log(CREATE_SESSION_WITH_FACEBOOK_CONTROLLER, `fb user access token': ${userAccessToken}`);
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
            const redirectUrl = req.query.redirect_url || config.tinnat[environment].url.login_success;
            return res.redirect(redirectUrl);
        }
    }
    const errorUrl = req.query.error_url || config.tinnat[environment].url.login_failure;
    return res.redirect(errorUrl);
};

module.exports = createSessionWithFacebook;