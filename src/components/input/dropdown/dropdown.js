
import React, { useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import "./dropdown.scss";

export const Dropdown = ({ label, onChange, choice = "", options }) => {
    const [value, setValue] = useState(choice);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleChange = e => {
        setValue(e.target.value);
        onChange(e.target.value);
    }
    const renderDropdownOptions = () => options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)

    return <FormControl className={"dropdown"}>{label && <InputLabel children={label} />}
        <Select open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            className={"dropdown-select"}
            onChange={handleChange}
            value={value}>
            {renderDropdownOptions()}
        </Select>
    </FormControl>
}