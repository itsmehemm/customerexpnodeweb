import React from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../../elements/Typography';

const WebInternalServerError = () => {
    return (
        <Container maxWidth={'lg'}>
            <Box m={2}>
                <Card variant='outlined'>
                    <Grid container>
                        <Grid item align='center' xs={12}>
                            <Box m={2}>
                                <Typography variant='h1' text='500' />
                            </Box>
                        </Grid>
                        <Grid item align='center' xs={12}>
                            <Box m={2}>
                                <Typography variant='h6' text={`It's on us. We faced an internal server error processing your request. Please check your internet connection and try again or come back later.`} />
                            </Box>
                        </Grid>
                        <Grid item align='center' xs={12}>
                            <Box m={2}>
                                <Typography className='t-text-link-2' variant='subtitle1' text={`Take me to the home page`} onClick={() => window.href = '/home'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Container>
    );
};

export default WebInternalServerError;