import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '../../common/elements/Typography';

const useStyles = makeStyles({
    root: {
        width: 175,
        backgroundColor: 'rgb(247, 36, 52)',
        color: '#fff'
    },
});

export default function LoggedInUser(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event, name) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        if (props[name]) {
            props[name].onClick();
        }
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                style={{ color: '#fff' }} >
                <IconButton aria-label='user' style={{ color: '#fff' }} >
                    <FaceIcon />
                </IconButton>
                {props.name}
            </Button>
            <Popper className={classes.root} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        className={classes.root}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                                    <MenuItem className={classes.root} onClick={(e) => handleClose(e, 'account')}>
                                        <Typography text='Account' variant='button' icon='account_circle' />
                                    </MenuItem>
                                    <MenuItem className={classes.root} onClick={(e) => handleClose(e, 'orders')}>
                                        <Typography text='Orders' variant='button' icon='local_mall' />
                                    </MenuItem>
                                    <MenuItem className={classes.root} onClick={(e) => handleClose(e, 'logout')}>
                                        <Typography text='Logout' variant='button' icon='exit_to_app' />
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};