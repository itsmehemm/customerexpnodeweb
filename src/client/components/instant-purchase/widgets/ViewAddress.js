import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '../../common/elements/TextField';
import LargeBtn from '../../common/elements/LargeBtn';
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
    } = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    !shipping_same_as_billing &&
                    <>
                        <Box m={3}>
                            <Typography size="h6" text={name} />
                        </Box>
                        <Box m={2}>
                            <Box m={1}><Typography component="p" size="normal" text={address_line_1} /></Box>
                            {address_line_2 && <Box m={1}><Typography component="p" size="normal" text={address_line_2} /></Box>}
                            <Box m={1}><Typography component="p" size="normal" text={city + " " + pincode} /></Box>
                            <Box m={1}><Typography component="p" size="normal" text={landmark} /></Box>
                            <Box m={1}><Typography component="p" size="normal" text={state} /></Box>
                        </Box>
                    </>
                }
            </Grid>
        </Grid>
    );
};

export default ViewAddress;