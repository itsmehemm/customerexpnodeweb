import request from 'request';

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        request({
            uri: `http://localhost.paypal.com:2002/api/product/${id}`,
            method: 'GET',
            headers: {
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "admin", "key": "tinnat" })
            }
        }, (e, r, b) => {
            b = JSON.parse(b || '{}');
            console.log(JSON.stringify(b));
            if (b && b.error) {
                resolve(null);
            } else {
                resolve(b);
            }
        });
    });
};

export default getProductById;