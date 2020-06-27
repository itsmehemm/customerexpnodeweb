const request = require('async-request');
const config = require('../lib/config.json');

const getAppInfo = async (userAccessToken) => {
    if (!userAccessToken) {
        console.log('[ERROR]', 'oauth::facebook::getAppInfo', `invalid or no access token received.`);
        return null;
    }
    const appInfoUrl = config.facebook.oauth.debug_token.url;
    let response = await request(`${appInfoUrl}?input_token=${userAccessToken}&access_token=${userAccessToken}`);
    response = JSON.parse(response && response.body || '{}');
    if (response && response.error) {
        console.log('[ERROR]', 'oauth::facebook::getAppInfo', `error fetching app info: ${JSON.stringify(response.error)}`);
        return null;
    }
    console.log('[INFO]', 'oauth::facebook::getAppInfo', `app info fetched from fb debug_token: ${JSON.stringify(response && response.data)}`);
    return response && response.data;
};

const getUserInfo = async (userAccessToken) => {
    if (!userAccessToken) {
        console.log('[ERROR]', 'oauth::facebook::getUserInfo', `invalid or no access token received.`);
        return null;
    }
    const userInfoUrl = config.facebook.oauth.me.url;
    let response = await request(`${userInfoUrl}?access_token=${userAccessToken}&fields=id%2Cname%2Cemail&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
    response = JSON.parse(response && response.body || '{}');
    if (response && response.error) {
        console.log('[ERROR]', 'oauth::facebook::getUserInfo', `error fetching user info: ${JSON.stringify(response.error)}`);
        return null;
    }
    console.log('[INFO]', 'oauth::facebook::getUserInfo', `user info fetched from fb me: ${JSON.stringify(response && response.data)}`);
    return response;
};

const authenticate = async (userAccessToken) => {
    console.log('[INFO]', 'oauth::facebook::authenticate', `authenticating user with facebook`);
    if (!userAccessToken) {
        console.log('[ERROR]', 'oauth::facebook::authenticate', `invalid or no access token received`);
        return null;
    }
    const appInfo = await getAppInfo(userAccessToken);
    if (appInfo && appInfo.app_id === config.facebook.app_id) {
        const loggedUserId = appInfo.user_id;
        const userInfo = await getUserInfo(userAccessToken);
        if (userInfo && userInfo.id === loggedUserId) {
            console.log('[INFO]', 'oauth::facebook::authenticate', `authenticating user: ${JSON.stringify(userInfo)}`);
            return {
                accountNumber: userInfo.id,
                name: userInfo.name,
                email: userInfo.email
            };
        }
    }
    console.log('[ERROR]', 'oauth::facebook::authenticate', `invalid user to login`);
    return null;
};

module.exports = {
    authenticate: authenticate
};