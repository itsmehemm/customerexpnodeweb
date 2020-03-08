import request from 'request';
import config from '../../configs/config.json';

const environment = config.environment;

const editItemInCart = async (item) => {
    return fetch(config[environment].api.v1_post_edit_item_cart.uri, {
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
            return response;
        })
};

export default editItemInCart;