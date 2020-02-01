import React from 'react';

const WebInternalServerError = (props) => {
    const { error } = props;
    return (
        <div>
            404 NOT FOUND
            {error}
        </div>
    );
};

export default WebInternalServerError;