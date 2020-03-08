import request from 'request';
import config from '../configs/config.json';

const environment = config.environment;

const addProduct = async (product) => {
    return new Promise((resolve, reject) => {
        request({
            uri: config[environment].api.v1_post_add_product.uri,
            method: 'POST',
            headers: {
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "admin", "key": "tinnat" })
            },
            body: product
        }, (e, r, b) => {
            b = JSON.parse(b || '{}');
            console.log(JSON.stringify(b));
            resolve(b);
        });
    });
};

export default addProduct;