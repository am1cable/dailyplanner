
import React, { useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import "./dropdown.scss";

export const Dropdown = ({ label, onChange, choice = "", options }) => {
    const [value, setValue] = useState(choice);
    const handleChange = e => {
        setValue(e.target.value);
        if (e.target.value !== choice) onChange(e.target.value);
    }
    const renderDropdownOptions = () => options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)

    return <FormControl  className={"dropdown"}>{label && <InputLabel children={label} />}
            <Select className={"dropdown-select"} onChange={handleChange} value={value}>{renderDropdownOptions()}</Select>
        </FormControl>
}