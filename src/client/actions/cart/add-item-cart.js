import config from '../../configs/config.json';

const environment = config.environment;

export const addItemToCart = async (item) => {
    return new Promise((resolve, reject) => {
        fetch(config[environment].api.v1_post_add_item_cart.uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-TINNAT-SECURITY-CONTEXT': JSON.stringify({ "userId": "admin", "key": "tinnat" })
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(response => {
                console.log(JSON.stringify(response));
                resolve(response);
            }).catch(error => {
                resolve({})
            });
    });
};

export default addItemToCart;