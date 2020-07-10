import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const ButtonLoader = () => {
    return (<Button
        style={{ height: '100%', width: '100%', backgroundColor: 'rgb(247, 36, 52)', color: '#fff' }}
        variant="contained"
        disabled={true}>
        <CircularProgress size={25} style={{ color: '#fff' }} />
    </Button>);
};

export default ButtonLoader;