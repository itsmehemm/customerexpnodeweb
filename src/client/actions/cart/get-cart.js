import request from 'request';
import config from '../../configs/config.json';

// const environment = 'production';
const environment = 'development';

export const getCart = async () => {
    return new Promise((resolve, reject) => {
        request({
            uri: config[environment].api.v1_get_cart.uri,
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

export default getCart;