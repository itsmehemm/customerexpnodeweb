import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Typography from '../common/elements/Typography';

import '../../styles/footer.css';

const Footer = () => {
    return (
        <Container maxWidth="xl">
            <Box m={2}>
                <Typography align="center" size="subtitle1" text="&copy; 2020 Tinnat Inc. All rights reserved." />
            </Box>
        </Container>
    );
};

export default Footer;