import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Address from './Address';
import Typography from '../common/elements/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';

export default class DeliveryInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display_dropdown: true
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        const { display_dropdown } = this.state;
        this.setState({ display_dropdown: !display_dropdown });
    }

    render() {
        const { display_dropdown } = this.state;
        const { delivery_information } = this.props;
        return (
            <Card variant="outlined">
                <Box m={2}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Box m={2}><Typography style={{ color: '#878787' }} text="1.&ensp;DELIVERY INFORMATION" /></Box>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={this.toggleDropdown} aria-label="delete">
                                {display_dropdown === true ? <Close /> : <Add />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div style={{ display: display_dropdown === true ? 'block' : 'none' }}>
                        <Box m={2}><Divider /></Box>
                        <Address update={(data) => {
                            if (data) {
                                this.toggleDropdown();
                            }
                            this.props.update(data);
                        }} address={delivery_information} />
                    </div>
                </Box>
            </Card>
        );
    }
}