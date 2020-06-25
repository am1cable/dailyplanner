
import React, { useState, useEffect } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import "./dropdown.scss";

const defaultDropdownOptions = (options) => options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)

export const Dropdown = ({ label, onChange, choice = "", options, dropdownOptions = defaultDropdownOptions }) => {
    const [value, setValue] = useState(choice);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {setValue(choice)}, [choice]);

    const handleChange = e => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    return <FormControl className={"dropdown"}>{label && <InputLabel children={label} />}
        <Select open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            className={"dropdown-select"}
            onChange={handleChange}
            value={value}>
            {dropdownOptions(options)}
        </Select>
    </FormControl>
}