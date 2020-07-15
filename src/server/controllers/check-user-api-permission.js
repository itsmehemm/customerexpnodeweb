const { getAPIName } = require('../lib/utils');
const errorConstants = require('../lib/constants/error-constants');
const { CHECK_USER_API_PERMISSION_CONTROLLER } = require('../lib/constants/logging-constants');
const apiPermissions = require('../lib/permissions/api.json');

const checkUserAPIPermission = (req, res, next) => {
    console.log(CHECK_USER_API_PERMISSION_CONTROLLER, `checking user permission for ${req.url}`);
    const apiName = getAPIName(req);
    const api = apiPermissions[apiName];
    console.log(CHECK_USER_API_PERMISSION_CONTROLLER, `api resource: ${apiName}`);
    if (api && Array.isArray(api.permissions)) {
        console.log(CHECK_USER_API_PERMISSION_CONTROLLER, `available permissions: ${api.permissions}`);
        const accountType = req.user && req.user.accountType;
        console.log(CHECK_USER_API_PERMISSION_CONTROLLER, `user account type ${accountType}`);
        if (api.permissions.includes(accountType)) {
            console.log(CHECK_USER_API_PERMISSION_CONTROLLER, `user has permission to ${req.url}`);
            return next();
        }
        console.error(CHECK_USER_API_PERMISSION_CONTROLLER, `either user account type or permissions not found`);
    }
    console.warn(CHECK_USER_API_PERMISSION_CONTROLLER, `user does not have permission to ${req.url}`);
    return res.status(401).send({
        error: {
            ...errorConstants.PERMISSION_DENIED,
            error_redirect_url: `/notfound?debug_id=${req.debugId}`
        }
    });
};

module.exports = checkUserAPIPermission;