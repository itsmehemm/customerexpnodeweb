const postalpincodeApi = require('../postalpincode');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');
const { UPDATE_DELIVERY_PINCODE_CONTROLLER } = require('../lib/constants/logging-constants');

const updateDeliveryPincode = async (req, res, next) => {
    console.log(UPDATE_DELIVERY_PINCODE_CONTROLLER, `update pincode for delivery: ${req.body && req.body.pincode}`);
    if (req.body && req.body.pincode) {
        const response = await postalpincodeApi.load(req.body.pincode);
        if (!response || (response && response.error)) {
            return res.status(404).send({
                error: response.error
            });
        }
        req.session = req.session || {};
        req.session.delivery = {
            pincode: req.body.pincode,
            state: response.getState(),
            district: response.getDistrict(),
            region: response.getRegion(),
            place: response.getPlace()
        };
        console.log(UPDATE_DELIVERY_PINCODE_CONTROLLER, `pincode details updated in session: ${JSON.stringify(req.session.delivery)}`);
        return res.status(200).send({
            ...apiMessages.PINCODE_UPDATED
        });
    }
    return res.status(400).send({
        error: errorConstants.INVALID_DATA
    });
};

module.exports = updateDeliveryPincode;