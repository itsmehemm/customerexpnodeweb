import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MultiSelect = (props) => {
    let { id, options = [], error = false, label, helperText = "", required = false, values = [], type = "text", width = 12, onChange } = props;
    return (
        <Grid item xs={width}>
            <InputLabel>{label}</InputLabel>
            <Select
                error={error}
                fullWidth={true}
                variant="outlined"
                id={id}
                multiple
                value={values}
                onChange={event => onChange(event.target.value)}
                input={<Input />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={values.indexOf(option.value) > -1} />
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Select>
            <InputLabel>{helperText}</InputLabel>
        </Grid>);
}

export default MultiSelect;



