import request from 'request';
import config from '../configs/config.json';

// const environment = 'production';
const environment = 'development';

export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        request({
            uri: config[environment].api.v1_get_product_by_id.uri + id,
            method: 'GET',
            headers: {
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "admin", "key": "tinnat" })
            }
        }, (e, r, b) => {
            b = JSON.parse(b || '{}');
            console.log(JSON.stringify(b));
            resolve(b);
        });
    });
};

export default getProductById;