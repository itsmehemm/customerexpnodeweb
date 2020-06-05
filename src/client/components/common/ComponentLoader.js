import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const ComponentLoader = () => (<Container maxWidth="sm">
    <Grid container justify="center">
        <Box m={35}><CircularProgress /></Box>
    </Grid>
</Container>);

export default ComponentLoader;