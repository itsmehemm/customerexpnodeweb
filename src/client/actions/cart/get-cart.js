import request from 'request';
import config from '../../configs/config.json';

const environment = config.environment;

export const getCart = async () => {
    return new Promise((resolve, reject) => {
        request({
            uri: config[environment].api.v1_get_cart.uri,
            method: 'GET',
            headers: {
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "tinnat_guest", "key": "tinnat_guest_secret" })
            }
        }, (e, r, b) => {
            b = JSON.parse(b || '{}');
            console.log(JSON.stringify(b));
            resolve(b);
        });
    });
};

export default getCart;