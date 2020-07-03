module.exports = {
    X_TINNAT_SECURITY_CONTEXT: 'x-tinnat-security-context',
    ADMIN_USER: 'admin',
    ADMIN_USER_KEY: 'tinnat',
    TINNAT_WEB: 'tinnat_web',
    TINNAT_WEB_GUEST: 'tinnat_guest',
    TINNAT_WEB_GUEST_KEY: 'tinnat_guest_secret',
    TINNAT_FACEBOOK_OAUTH: 'tinnat_facebook_oauth',
    ORDER_LIFE_TIME: 14400000,
    ENVIRONMENT_PRODUCTION: 'ENVIRONMENT_PRODUCTION',
    ENVIRONMENT_DEVELOPMENT: 'ENVIRONMENT_DEVELOPMENT',
    status: {
        COMPLETED: 'COMPLETED',
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE'
    },
    CURRENCY: {
        INR: 'INR'
    },
    INTENT: {
        CAPTURE: 'CAPTURE',
    },
    COUNTRY_CODE: {
        IN: 'IN'
    },
    API_NAME: {
        GET_PRODUCTS: 'get_products',
        GET_FEATURED_PRODUCTS: 'get_featured_products',
        GET_FILTERED_PRODUCTS: 'get_filtered_products',
        GET_PRODUCTS_BY_CATEGORY: 'get_products_by_category',
        ADD_PRODUCT: 'add_product',
        GET_PRODUCT_BY_ID: 'get_product_by_id',
        EDIT_PRODUCT_BY_ID: 'edit_product_by_id',
        REMOVE_PRODUCT_BY_ID: 'remove_product_by_id',
        CREATE_INSTANT_ORDER: 'create_instant_order',
        GET_ORDER_BY_ID: 'get_order_by_id',
        PATCH_ORDER_BY_ID: 'patch_order_by_id',
        GET_PAYMENT_PLAN: 'get_payment_plan',
        RAZORPAY_PAYMENT_COMPLETE: 'razorpay_payment_complete',
        UPDATE_DELIVERY_PINCODE: 'update_delivery_pincode',
        GET_PAYMENT_ACTIVITY: 'get_payment_activity',
        GET_PAYMENT_ACTIVITY_INTERNAL: 'get_payment_activity_internal',
        SEARCH_TRANSACTIONS: 'search_transactions'
    },
    SOFT_DESCRIPTOR: 'Tinnos India',
    ORDER_INIT: 'INITIAL',
    RECEIPT_PREFIX: 'R-',
    ORDER_PREFIX: 'ORDER-',
    ORDER_PAYMENT_PENDING: 'PAYMENT_PENDING',
    ORDER_COMPLETED: 'COMPLETED',
    COMPLETED: 'COMPLETED',
    MAILSERVICE: {
        NOREPLY: 'noreply',
        ORDERCONFIRMATION: 'orderconfirmation'
    },
    DELIVERABLE: 'DELIVERABLE',
    NOT_DELIVERABLE: 'NOT_DELIVERABLE',
    ORDER_PAYMENT: 'ORDER_PAYMENT',
    PERSONAL_ACCOUNT: 'PERSONAL_ACCOUNT',
    FACEBOOK: 'FACEBOOK',
    RAZORPAY: 'RAZORPAY'
};
