const addProductToRecentView = (productid) => {
    console.log('[INFO]', 'action::addProductToRecentView', `add product with id ${productid} to recent view`);
    let recentProducts = localStorage.getItem('tinnat-recent-views');
    if (!recentProducts) {
        console.log('[INFO]', 'action::addProductToRecentView', `no recent products found.`)
        recentProducts = '{}';
    }
    recentProducts = JSON.parse(recentProducts);
    console.log('[INFO]', 'action::addProductToRecentView', `recent products: ${JSON.stringify(recentProducts)}`);
    recentProducts[productid] = {
        time: new Date().getTime()
    };
    localStorage.setItem('tinnat-recent-views', JSON.stringify(recentProducts));
    console.log('[INFO]', 'action::addProductToRecentView', `recent products after update: ${JSON.stringify(recentProducts)}`);
};

export default addProductToRecentView;