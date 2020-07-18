import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Header from './Header';
import User from './user/User';
import logo from '../../images/tinnat-logo-white.png';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        backgroundColor: 'rgb(247, 36, 52)',
        width: '100%',
        marginLeft: '-5%'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

const HeaderWrapper = () => {
    const classes = useStyles();
    if (isMobile) {
        return (
            <Container maxWidth={false}>
                <AppBar position='static'>
                    <Toolbar className={classes.toolbar}>
                        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                            <MenuIcon />
                        </IconButton>
                        <Grid container>
                            <Grid item align='center' xs={12}>
                                <img src={logo} alt='Tinnat' height='80px' width='120px' />
                            </Grid>
                        </Grid>
                        <Box align='right'>
                            <User />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Container>
        );
    }
    return <Header />;
};

export default HeaderWrapper;