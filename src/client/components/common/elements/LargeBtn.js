import React from 'react';
import Icon from './Icon';

const LargeBtn = (props) => {
    return (
        <button onClick={() => props.onClick()} style={{ background: props.color, ...props.style }} className={`t-large-btn ${props.disabled && 't-large-btn-disabled'}`}>
            <Icon name={props.icon} />&ensp;{props.name}
        </button>
    );
};

export default LargeBtn;