import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const _TextField = (props) => {
    const {
        id,
        label,
        helperText = "",
        error = false,
        disabled = false,
        required = false,
        value = '',
        type = "text",
        width = 12,
        onChange
    } = props;
    return (
        <Grid item xs={width}>
            <TextField
                disabled={disabled}
                error={error}
                required={required}
                value={value}
                fullWidth={true}
                id={id}
                label={label}
                type={type}
                helperText={helperText}
                onChange={event => onChange(event.target.value)}
                variant="outlined"
            />
        </Grid>
    );
}

export default _TextField;