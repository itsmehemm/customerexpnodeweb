
const { WHOAMI_CONTROLLER } = require('../lib/constants/logging-constants');
const apiMessages = require('../lib/constants/api-messages');

const whoami = (req, res) => {
    console.log(WHOAMI_CONTROLLER, `request received for whoami`);
    const user = req.user;
    if (user && user.accountId) {
        console.log(WHOAMI_CONTROLLER, `login found. sending user info`);
        return res.status(200).send({
            ...apiMessages.TINNAT_USER,
            data: {
                name: user.name,
                email: user.email,
                accountId: user.accountId,
                authentication_party: user.authenticationParty,
            }
        });
    }
    console.log(WHOAMI_CONTROLLER, `no login found. guest session`);
    return res.status(200).send({
        ...apiMessages.GUEST_USER
    });
};

module.exports = whoami;