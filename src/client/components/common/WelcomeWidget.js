import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '../common/elements/Typography';

const WelcomeWidget = () => {
    return (
        <Container maxWidth={"lg"}>
            <Grid alignItems="center"
                justify="center"
                container
                spacing={1}>
                <Box m={4}>
                    <span className="header-large">
                        Welcome to&nbsp;
                        <span className="highlight-text">T</span>
                        he&nbsp;
                        <span className="highlight-text">INN</span>
                        ovative&nbsp;
                        <span className="highlight-text">AT</span>
                        tire
                    </span>
                </Box>
                <Typography size="subtitle1" text="Tinnat.com, a.k.a, The Innovative Attire is an innovative e-commerce website built in and for Indian customers with love. Shop for T-shirts, Jeans, Accessories and many other stuffs for the best prices and quality." />
            </Grid>
        </Container>
    );
};

export default WelcomeWidget;