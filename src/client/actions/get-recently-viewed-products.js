
export const getRecentlyViewedProducts = () => {
    console.log('[INFO]', 'action::getRecentlyViewedProducts');
    console.log(JSON.stringify(localStorage));
    const recentProducts = localStorage.getItem('tinnat-recent-views');
    return JSON.parse(recentProducts || '{}');
};

export default getRecentlyViewedProducts;