import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from './Icon';

const LargeBtn = (props) => {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            style={{ background: props.color, ...props.style }}
            className={`t-large-btn ${props.disabled && 't-large-btn-disabled'}`}>
            {!props.loading && <><Icon name={props.icon} />&ensp;{props.name}</>}
            {props.loading && <CircularProgress size={30} style={{ color: '#fff' }} />}
        </button>
    );
};

export default LargeBtn;