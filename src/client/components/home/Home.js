import React from 'react';
import Header from '../header/Header';
import HomeBanner from '../common/HomeBanner';
import FeaturedProducts from '../featured/FeaturedProducts';
import RecentProducts from '../recent-products/RecentProducts';

const Home = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FeaturedProducts />
            <RecentProducts />
        </div>
    )
}

export default Home;