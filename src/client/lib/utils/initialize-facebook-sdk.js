const initializeFacebookSDK = function (d, s, id) {
    return new Promise(resolve => {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return resolve(); }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        return resolve();
    });
};

export default initializeFacebookSDK;
