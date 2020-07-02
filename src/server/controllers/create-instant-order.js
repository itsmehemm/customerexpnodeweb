const InstantPurchaseModal = require('../modals/InstantPurchaseModal');
const { CREATE_INSTANT_ORDER_CONTROLLER } = require('../lib/constants/logging-constants');
const errorConstants = require('../lib/constants/error-constants');
const apiMessages = require('../lib/constants/api-messages');

const createInstantOrder = async (req, res) => {
    console.log(CREATE_INSTANT_ORDER_CONTROLLER, `processing request to create instant order for: ${JSON.stringify(req.body)}`);
    const purchaseItems = req.body.purchase_items;
    if (Array.isArray(purchaseItems) && purchaseItems.length === 1) {
        const purchaseItem = purchaseItems[0];
        const productid = purchaseItem.id;
        if (!productid) {
            return res.status(400).send({
                error: errorConstants.INVALID_DATA
            });
        }
        const { accountId } = req && req.user;
        const instantPurchaseModal = new InstantPurchaseModal(accountId);
        const orderId = await instantPurchaseModal.create(req.body);
        if (!orderId) {
            return res.status(404).send({
                error: errorConstants.PRODUCT_NOT_FOUND
            });
        }
        return res.status(200).send({
            ...apiMessages.ORDER_CREATED,
            id: orderId,
            links: [{
                name: 'PATCH_ORDER',
                method: 'PATCH',
                href: `/api/order/${orderId}`,
            }, {
                name: 'INSTANT_PURCHASE',
                method: 'GET',
                href: `/instant-purchase/${orderId}`
            }]
        });
    } else {
        return res.status(400).send({
            error: errorConstants.INVALID_OR_MORE_ITEMS_RECEIVED
        });
    }
};

module.exports = createInstantOrder;