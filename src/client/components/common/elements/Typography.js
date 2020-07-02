import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '../elements/Icon';
import FacebookIcon from '@material-ui/icons/Facebook';

const _Typography = (props) => {
    let {
        width = 12,
        icon,
        icon_type = "default",
        icon_pos = "front",
        text, style, iconStyle,
        align,
        size = "h6",
        component = "h2",
        variant
    } = props;
    if (variant === 'body1_bold') {
        variant = 'body1';
        style = {
            ...style,
            fontWeight: 900
        };
    }
    return (
        <Grid item xs={width}>
            <Typography
                style={style}
                align={align}
                component={component}
                {...props}
                variant={variant}
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
