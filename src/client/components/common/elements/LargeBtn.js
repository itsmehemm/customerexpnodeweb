import React from 'react';
import Icon from './Icon';

const LargeBtn = (props) => {
    return (
        <button style={{ background: props.color }} className="t-large-btn">
            <Icon name={props.icon} />&ensp;{props.name}
        </button>
    );
};

export default LargeBtn;