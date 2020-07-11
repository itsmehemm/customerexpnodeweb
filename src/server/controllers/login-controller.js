const { LOGIN_CONTROLLER } = require('../lib/constants/logging-constants');
const {
    getDefaultRedirectUrl
} = require('../lib/utils');

const LoginController = (req, res, next) => {
    console.log(LOGIN_CONTROLLER, `request to login page received`);
    if (req && req.session && req.session.sessionId) {
        console.log(LOGIN_CONTROLLER, `session`, JSON.stringify(req.session));
        const redirectUrl = req.query.redirect_url || getDefaultRedirectUrl();
        return res.redirect(redirectUrl);
    }
    console.log(LOGIN_CONTROLLER, `no session found. rendering login page`);
    return next();
};

module.exports = LoginController;