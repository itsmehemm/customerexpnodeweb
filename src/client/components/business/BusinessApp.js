import React from 'react';
import SecondaryHeader from '../header/SecondaryHeader';
import Footer from '../footer/Footer';

const BusinessApp = (props) => {
    return (
        <>
            <SecondaryHeader />
            {props.children}
            <Footer />
        </>
    );
};

export default BusinessApp;