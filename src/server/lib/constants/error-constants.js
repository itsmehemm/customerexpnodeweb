module.exports = {
    INVALID_DATA: {
        message: 'INVALID_DATA',
        description: 'Invalid data received in the request. Please check the API specification and try again.'
    },
    MISSING_REQUIRED_PARAMETERS: {
        message: 'MISSING_REQUIRED_PARAMETERS',
        description: 'One or more required parameters missing. Please check the API specification and try again.'
    },
    INTERNAL_SERVER_ERROR: {
        message: 'INTERNAL_SERVER_ERROR',
        description: 'An internal server error occurred while trying to process your request. Please try again.'
    },
    DATABASE_ERROR: {
        message: 'DATABASE_ERROR',
        description: 'An error occurred while executing a query in the database. Please try again.'
    },
    PRODUCT_NOT_FOUND: {
        message: 'PRODUCT_NOT_FOUND',
        description: 'The product doesn\'t exist.'
    },
    INVALID_OR_MORE_ITEMS_RECEIVED: {
        message: 'INVALID_OR_MORE_ITEMS_RECEIVED',
        description: 'Invalid or more items received. Please check the API specification and try again'
    },
    ORDER_NOT_FOUND: {
        message: 'ORDER_NOT_FOUND',
        description: 'There are no orders with the given id'
    },
    ERROR_CREATING_PAYMENT_PLAN: {
        message: 'ERROR_CREATING_PAYMENT_PLAN',
        description: 'There was an error creating payment plan for this order'
    },
    RAZORPAY_PAYMENT_FAILED: {
        message: 'RAZORPAY_PAYMENT_FAILED',
        description: 'Payment failed. Please try again or use another mode of payment'
    },
    PAYMENT_ALREADY_COMPLETED: {
        message: 'PAYMENT_ALREADY_COMPLETED',
        description: 'Payment is already received for this order'
    },
    ORDER_ALREADY_PURCHASED: {
        message: 'ORDER_ALREADY_PURCHASED',
        description: 'This already has been placed already'
    },
    CANNOT_PATCH_COMPLETED_ORDER: {
        message: 'CANNOT_PATCH_COMPLETED_ORDER',
        description: 'Cannot patch order that has been completed already'
    },
    INSUFFICIENT_DETAILS_TO_GET_PAYMENT_PLAN: {
        message: 'INSUFFICIENT_DETAILS_TO_GET_PAYMENT_PLAN',
        description: 'One or more required details are missing in the order'
    },
    INVALID_PINCODE: {
        message: 'INVALID_PINCODE',
        description: 'Invalid delivery pincode. Please try again'
    },
    NOT_DELIVERABLE: {
        message: 'NOT_DELIVERABLE',
        description: 'Sorry, we don\'t deliver product to this pincode at this time'
    },
    PAYMENT_ACTIVITY_NOT_FOUND: {
        message: 'PAYMENT_ACTIVITY_NOT_FOUND',
        description: 'Sorry, the activity you\'re looking for doesn\'t exist'
    },
    UNAUTHORIZED_REQUEST: {
        message: 'UNAUTHORIZED_REQUEST',
        description: 'The user is not authorized to access this resource'
    },
    PERMISSION_DENIED: {
        message: 'PERMISSION_DENIED',
        description: 'The user doesn\'t have the required permissions to access this resource'
    }
};