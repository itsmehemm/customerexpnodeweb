import React from 'react';
import ConsumerApp from '../common/ConsumerApp';
import HomeBanner from '../common/misc/HomeBanner';
import FeaturedProducts from '../common/featured/FeaturedProducts';
import RecentProducts from '../common/recent/RecentProducts';

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