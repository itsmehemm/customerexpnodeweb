import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const Select = (props) => {
    const { id, error = false, helperText = "", options = [], label, required = false, value = null, type = "text", width = 12, onChange } = props;
    return (
        <Grid item xs={width}>
            <TextField
                error={error}
                helperText={helperText}
                required={required}
                id={id}
                fullWidth={true}
                select
                label={label}
                value={value}
                onChange={event => onChange(event.target.value)}
                variant="outlined"
            >
                {
                    options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </TextField>
        </Grid>);
}

export default Select;