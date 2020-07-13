import React from 'react';
import Header from '../header/Header';
import Footer from './Footer';

const ConsumerApp = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

export default ConsumerApp;