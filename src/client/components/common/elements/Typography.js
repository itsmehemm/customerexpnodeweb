import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '../elements/Icon';
import FacebookIcon from '@material-ui/icons/Facebook';

const _Typography = (props) => {
    const {
        width = 12,
        icon,
        icon_type = "default",
        icon_pos = "front",
        text, style, iconStyle,
        align,
        size = "h6",
        component = "h2"
    } = props;
    return (
        <Grid item xs={width}>
            <Typography
                style={style}
                variant={size}
                align={align}
                component={component}
                {...props}
            >
                {icon_type === 'default' && icon_pos === 'front' && icon && <> <Icon name={icon} /> {text} </>}
                {icon_type === 'default' && icon_pos === 'back' && icon && <> {text} <Icon name={icon} /> </>}
                {icon_type === 'user' && icon === 'facebook' && <> <FacebookIcon style={iconStyle} /> {text} </>}
                {!icon && text}
            </Typography>
        </Grid>
    );
};

export default _Typography;
