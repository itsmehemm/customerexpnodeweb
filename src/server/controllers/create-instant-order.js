const { CREATE_INSTANT_ORDER_CONTROLLER } = require('../lib/constants/logging-constants');
const OrderModal = require('../modals/OrderModal');

const createInstantOrder = async (req, res) => {
    console.log(CREATE_INSTANT_ORDER_CONTROLLER, `Processing request to create instant order.`);
    console.log(CREATE_INSTANT_ORDER_CONTROLLER, `instant product: ${JSON.stringify(req.body)}`);
    const purchaseItems = req.body.purchase_items;
    if (Array.isArray(purchaseItems) && purchaseItems.length === 1) {
        const purchaseItem = purchaseItems[0];
        const productid = purchaseItem.id;
        if (!productid) {
            return res.status(400).send({
                error: {
                    message: 'INVALID_DATA',
                    description: 'Invalid product data received. Please check the API specification and try again.'
                }
            });
        }

        const orderModal = new OrderModal();

        const result = await orderModal.addPurchaseItem(purchaseItem);

        if (!result) {
            return res.status(400).send({
                error: {
                    message: 'PRODUCT_NOT_FOUND',
                    description: 'There are no products with the given id.'
                }
            });
        }

        await orderModal.createOrder();

        if (orderModal.getOrderId()) {
            return res.status(200).send({
                status: 'COMPLETED',
                id: orderModal.getOrderId(),
                description: 'A new order has been created.',
                order_link: `/instant-purchase/${orderModal.getOrderId()}`
            });
        } else {
            return res.status(400).send({
                error: {
                    message: 'ORDER_CREATION_FAILED',
                    description: 'There was an error creating an order. Please try again later.'
                }
            });
        }
    } else {
        return res.status(400).send({
            error: {
                message: 'INVALID_OR_MORE_ITEMS_RECEIVED',
                description: 'Invalid or more items received. Please check the API specification and try again.'
            }
        });
    }
};

module.exports = createInstantOrder;