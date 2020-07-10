const postalpincodeApi = require('../postalpincode');
const apiMessages = require('../lib/constants/api-messages');
const errorConstants = require('../lib/constants/error-constants');
const { constructDeliveryObj } = require('../lib/utils');
const { UPDATE_DELIVERY_PINCODE_CONTROLLER } = require('../lib/constants/logging-constants');

const updateDeliveryPincode = async (req, res, next) => {
    console.log(UPDATE_DELIVERY_PINCODE_CONTROLLER, `update pincode for delivery: ${req.body && req.body.pincode}`);
    if (req.body && req.body.pincode) {
        const address = await postalpincodeApi.load(req.body.pincode);
        if (!address || (address && address.error)) {
            return res.status(404).send({
                error: address.error
            });
        }
        const delivery = await postalpincodeApi.getDeliveryStatus(address);
        req.session = req.session || {};
        req.session.delivery = {
            state: address.getState(),
            district: address.getDistrict(),
            region: address.getRegion(),
            place: address.getPlace(),
            pincode: address.getPincode(),
            status: delivery.status,
            deliveryTime: delivery.deliveryTime
        };
        console.info(UPDATE_DELIVERY_PINCODE_CONTROLLER, `pincode details updated in session: ${JSON.stringify(req.session.delivery)}`);
        return res.status(200).send({
            ...apiMessages.PINCODE_UPDATED,
            delivery: constructDeliveryObj(req.session.delivery)
        });
    }
    return res.status(400).send({
        error: errorConstants.INVALID_DATA
    });
};

module.exports = updateDeliveryPincode;