import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '../common/elements/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import ProductImages from '../common/widgets/ProductImages';
import Amount from '../common/elements/Amount';

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_dropdown: true
        }
    }

    toggleDropdown() {
        const { display_dropdown } = this.state;
        this.setState({ display_dropdown: !display_dropdown });
    }

    render() {
        const { display_dropdown } = this.state;
        return (
            <Card variant="outlined">
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Box m={2}>
                                <Typography text="2.&ensp;ORDER SUMMARY" style={{ color: '#878787' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => this.props.enable ? this.toggleDropdown() : ''} aria-label="delete">
                                {display_dropdown && this.props.enable ? <Close /> : <Add />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div style={{ display: display_dropdown && this.props.enable === true ? 'block' : 'none' }}>
                    {/* <div> */}
                        <Box m={2}><Divider /></Box>
                        <Box m={2}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <ProductImages
                                        style={{
                                            width: '150px',
                                            height: '150px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Box m={0}>
                                        <Typography text={"Tinnat T shirt"} size="h5" />
                                    </Box>
                                    <Box m={0}>
                                        <Typography text={"High quality T shirt from tinnat"} size="subtitle1" />
                                    </Box>
                                    <Box m={0}>
                                        <Amount cost={{ amount: 1000, curreny: "USD" }} discount={{ type: "INSTANT", value: "50" }} />
                                    </Box>
                                    <Box m={0}>
                                        <Typography text={"No of items - 1"} size="subtitle1" />
                                    </Box>
                                    <Box m={0}>
                                        <Typography text={"Delivery Fee - 0 INR"} size="subtitle1" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Box>
            </Card>
        );
    }
}