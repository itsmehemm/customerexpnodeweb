import React from 'react';
import Container from '@material-ui/core/Container';
import '../../styles/header.css';

const BaseHeader = (props) => {
    return (
        <Container
            style={{
                zIndex: 1,
                boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
                backgroundImage: 'linear-gradient(100deg, rgb(247, 36, 52), rgb(247, 36, 52))'
            }}
            maxWidth={false}>
            <Container maxWidth={'xl'}>
                {props.children}
            </Container>
        </Container>
    );
};

export default BaseHeader;