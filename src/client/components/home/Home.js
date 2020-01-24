import React from 'react';
import Header from '../common/Header.js'
import Footer from '../common/Footer.js'
import FeaturedProducts from '../home/FeaturedProducts';
import HomeSlideShow from '../common/HomeSlideShow';

const Home = () => {
    return (
        <div>
            <Header />
            <HomeSlideShow />
            <FeaturedProducts />
            <Footer />
        </div>
    )
}

export default Home;