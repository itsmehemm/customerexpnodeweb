const args = require('yargs').argv;
const config = require('../lib/config.json');
const { LOGOUT_SESSION_CONTROLLER } = require('../lib/constants/logging-constants');
const environment = args.env || ENVIRONMENT_PRODUCTION;

const logoutSession = (req, res, next) => {
    console.log(LOGOUT_SESSION_CONTROLLER, 'logging out session');
    if (req.session) {
        console.log(LOGOUT_SESSION_CONTROLLER, 'logout successful');
        req.session.destroy();
    }
    console.log(LOGOUT_SESSION_CONTROLLER, 'no session found to logout');
    return res.redirect(config.tinnat[environment].url.logout_success);
};

module.exports = logoutSession;