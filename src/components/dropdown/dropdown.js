
import React, { useState } from "react";
import { FormControl, Select, InputLabel, ClickAwayListener, MenuItem } from "@material-ui/core";

export const Dropdown = ({ label, onBlur, choice, options }) => {
    const [value, setValue] = useState(choice);
    const onClickAway = () => onBlur(value);
    const handleChange = e => setValue(e.target.value);
    const renderDropdownOptions = () => options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)

    return <ClickAwayListener onClickAway={onClickAway}>
        <FormControl><InputLabel children={label} />
            <Select autoWidth onChange={handleChange} value={value}>{renderDropdownOptions()}</Select>
        </FormControl>
    </ClickAwayListener>
}