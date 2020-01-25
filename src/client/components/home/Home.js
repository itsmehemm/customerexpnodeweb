import React from 'react';
import HomeBanner from '../common/HomeBanner';
import FeaturedProducts from '../home/FeaturedProducts';
import WelcomeWidget from '../common/WelcomeWidget'

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <FeaturedProducts />
            <WelcomeWidget />
        </div>
    )
}

export default Home;