import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '../elements/Icon';

const _Typography = (props) => {
    const { width = 12, icon, text, align, type, size = "h6", component="h2" } = props;
    return (
        <Grid item xs={width}>
            <Typography className={type === "header" ? "text-google-sans" : ""}
                variant={size}
                align={align}
                component={component}
                {...props}
            >
                {icon ? <Icon name={icon} /> : ""} {text}
            </Typography>
        </Grid>
    );
};

export default _Typography;
