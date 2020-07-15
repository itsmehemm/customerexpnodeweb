import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ThemeProvider } from '@material-ui/core/styles';
import LoginWithFacebook from './LoginWithFacebook';
import Typography from '../../../common/elements/Typography';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.setState({ open: this.props.open });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { open } = this.state;
        return (
            <Dialog fullWidth onClose={this.handleClose} aria-labelledby='login-dialog' open={open}>
                <DialogTitle id='login-dialog'>
                    <Typography align='center' icon='lock' variant='button' text='Securely login to www.tinnat.com' />
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <LoginWithFacebook />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider>
                        <Typography align='right' className='t-text-link-2' onClick={this.handleClose} text='No thanks, continue as Guest' />
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        );
    }
};