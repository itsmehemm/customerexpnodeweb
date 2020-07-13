import React from 'react';
import ConsumerApp from '../common/ConsumerApp';
import HomeBanner from '../common/HomeBanner';
import FeaturedProducts from '../featured/FeaturedProducts';
import RecentProducts from '../recent-products/RecentProducts';

const Home = () => {
    return (
        <ConsumerApp>
            <HomeBanner />
            <FeaturedProducts />
            <RecentProducts />
        </ConsumerApp>
    );
};

export default Home;