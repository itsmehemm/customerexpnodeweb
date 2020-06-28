import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
        this.fbAtttributes = {
            "data-size": "medium",
            "data-button-type": "continue_with",
            "data-layout": "rounded",
            "data-auto-logout-link": "true",
            "data-use-continue-as": "true",
            "data-width": "",
            "data-scope": "public_profile,email",
            "data-onlogin": "checkLoginStatus()"
        }
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const { open } = this.props;
        this.setState({ open: open });
    }

    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        this.setState({ open: open });
    }

    handleClose = () => this.setState({ open: false });

    handleFbSdkInit() {
        this.setState({ fbSdkLoaded: false })
    }

    handleFbSdkError() {
        this.setState({ fbSdkError: true })
    }

    handleFbSdkLoad() {
        this.setState({ fbSdkLoaded: true });
    }

    render() {
        const { open } = this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <div
                        className="fb-login-button"
                        {...this.fbAtttributes}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
};