import request from 'request';
import config from '../configs/config.json';

const environment = config.environment;

const getFeaturedProducts = async () => {
    return new Promise((resolve, reject) => {
        request({
            uri: config[environment].api.v1_get_featured_products.uri,
            method: 'GET',
            headers: {
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "admin", "key": "tinnat" })
            }
        }, (e, r, b) => {
            b = JSON.parse(b || '{}');
            console.log(JSON.stringify(b));
            if (b && b.featured) {
                resolve(b.featured);
            } else {
                resolve([]);
            }
        });
    });
};

export default getFeaturedProducts;