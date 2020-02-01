import React from 'react';
import Header from '../common/Header.js'
import HomeBanner from '../common/HomeBanner';
import FeaturedProducts from '../home/FeaturedProducts';
import WelcomeWidget from '../common/WelcomeWidget'
import Footer from '../common/Footer.js'

const Home = () => {
    return (
        <div>
            <Header />
            <HomeBanner />
            <FeaturedProducts />
            <Footer />
        </div>
    )
}

export default Home;