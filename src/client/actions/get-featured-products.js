import request from 'request';

const getFeaturedProducts = async () => {
    return new Promise((resolve, reject) => {
        request({
            uri: `http://localhost.paypal.com:2002/api/products/featured?limit=6`,
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