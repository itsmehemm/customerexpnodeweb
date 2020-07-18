import React from 'react';
import Header from '../header/HeaderWrapper';
import Footer from '../footer/FooterWrapper';

const ConsumerApp = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};

export default ConsumerApp;