import React from 'react';
import Header from '../header/Header';
import HomeBanner from '../common/HomeBanner';
import FeaturedProducts from '../home/FeaturedProducts';

const Home = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FeaturedProducts />
        </div>
    )
}

export default Home;