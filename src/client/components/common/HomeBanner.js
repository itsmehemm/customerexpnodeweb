import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import banner from '../../images/banner.jpg';

const HomeBanner = () => {
    return (
        <Container maxWidth={"lg"}>
            <Box m={1}>
                <img width="100%" src={banner} />
            </Box>
        </Container>
    );
}

export default HomeBanner;
