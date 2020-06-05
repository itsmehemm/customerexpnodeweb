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
    }
};