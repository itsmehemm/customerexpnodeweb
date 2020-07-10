import React from 'react';
import Button from '@material-ui/core/Button';

const PrimaryIconButton = ({ Icon, onClick }) => {
    return <Button
        style={{ height: '100%', width: '100%', backgroundColor: 'rgb(247, 36, 52)', color: '#fff' }}
        variant="contained"
        startIcon={Icon}
        onClick={() => onClick()}
    />
};

export default PrimaryIconButton;