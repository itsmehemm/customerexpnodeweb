import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '../../common/elements/Typography';

const ViewAddress = (props) => {
    const {
        name,
        address_line_1,
        address_line_2,
        city,
        state,
        pincode,
        landmark,
        shipping_same_as_billing,
        forceShow
    } = props;
    return (
        <Grid container style={{ backgroundColor: 'rgb(244, 244, 244)' }}>
            <Grid item xs={12}>
                {
                    (!shipping_same_as_billing || forceShow) &&
                    <>
                        <Box m={2}>
                            <Typography variant='h6' text={name} />
                        </Box>
                        <Box m={2}>
                            <Box m={0}><Typography variant='subtitle1' text={address_line_1} /></Box>
                            {address_line_2 && <Box m={0}><Typography variant='subtitle1' text={address_line_2} /></Box>}
                            <Box m={0}><Typography variant='subtitle1' text={city + ' ' + pincode} /></Box>
                            <Box m={0}><Typography variant='subtitle1' text={landmark} /></Box>
                            <Box m={0}><Typography variant='subtitle1' text={state} /></Box>
                        </Box>
                    </>
                }
            </Grid>
        </Grid>
    );
};

export default ViewAddress;