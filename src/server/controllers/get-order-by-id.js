const postalpincodeApi = require('../postalpincode');
const { GET_ORDER_BY_ID_CONTROLLER } = require('../lib/constants/logging-constants');
const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const errorConstants = require('../lib/constants/error-constants');
const { constructDeliveryObj } = require('../lib/utils');
const { ORDER_COMPLETED } = require('../lib/constants');
const { response } = require('express');

const getOrderById = async (req, res) => {
    console.log(GET_ORDER_BY_ID_CONTROLLER, `processing request to get order by id: ${req.params.id}.`);
    const { accountId } = req && req.user;
    const instantPurchaseModal = new InstantPurchaseModal(accountId);
    instantPurchaseModal.load(req.params.id);
    if (instantPurchaseModal.getOrderId()) {
        let delivery = null;
        if (instantPurchaseModal.getOrderStatus() !== ORDER_COMPLETED) {
            const shippingAddress = instantPurchaseModal.getShippingAddress();
            if (shippingAddress && shippingAddress.pincode) {
                const address = await postalpincodeApi.load(shippingAddress.pincode);
                if (address && !address.error && address.getPincode()) {
                    let deliveryData = await postalpincodeApi.getDeliveryStatus(address);
                    delivery = constructDeliveryObj({
                        state: address.getState(),
                        district: address.getDistrict(),
                        region: address.getRegion(),
                        place: address.getPlace(),
                        pincode: address.getPincode(),
                        status: deliveryData.status,
                        deliveryTime: deliveryData.deliveryTime
                    });
                } else if (response && response.error) {
                    delivery = {
                        error: response.error
                    };
                }
            }
        }
        return res.status(200).send({
            id: instantPurchaseModal.getOrderId(),
            delivery: delivery,
            ...instantPurchaseModal.getOrder()
        });
    } else {
        return res.status(404).send({
            error: errorConstants.ORDER_NOT_FOUND
        });
    }
};

module.exports = getOrderById;