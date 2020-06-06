const args = require('yargs').argv;
const config = require('../lib/config.json');
const { ENVIRONMENT_PRODUCTION } = require('../lib/constants')
const environment = args.env || ENVIRONMENT_PRODUCTION;

const getProductUrl = (id) => {
    let url = config.tinnat[environment].url.v1_get_product_by_id;
    url = url.replace('${productid}', id);
    return url;
};

module.exports = {
    getProductUrl: getProductUrl
};