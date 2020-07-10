import React from 'react';
import Header from '../../header/Header';
import WebInternalServerError from './widgets/WebInternalServerError';

const Error = () => {
    return (
        <>
            <Header />
            <WebInternalServerError />
        </>
    );
};

export default Error;