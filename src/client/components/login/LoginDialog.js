import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import LoginWithFacebook from '../user/LoginWithFacebook';
import Typography from '../common/elements/Typography';

const ActionButton = withStyles(() => ({
    root: {
        color: '#fff',
        backgroundColor: 'rgb(247, 36, 52)',
        border: '2px solid rgb(247, 36, 52)',
        '&:hover': {
            color: 'rgb(247, 36, 52)',
            border: '2px solid rgb(247, 36, 52)',
            backgroundColor: '#fff'
        },
    },
}))(Button);

export default class LoginDialog extends Component {
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
            <Dialog fullWidth onClose={this.handleClose} aria-labelledby="login-dialog" open={open}>
                <DialogTitle id="login-dialog">
                    <Typography align="center" icon="lock" variant="h6" text="Securely login to www.tinnat.com" />
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
                        <ActionButton onClick={this.handleClose} color="primary" autoFocus>
                            Continue as Guest
                        </ActionButton>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        );
    }
};