
import React, { useState, useRef } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import "./dropdown.scss";

export const Dropdown = ({ label, onChange, choice = "", options }) => {
    const [value, setValue] = useState(choice);
    const target = useRef(null);

    const handleChange = e => {
        setValue(e.target.value);
        onChange(e.target.value);
        setTimeout(() => {
            document.activeElement.blur();
        }, 10);
    }
    const renderDropdownOptions = () => options.map((option, index) => <MenuItem key={index} value={index}>{option}</MenuItem>)

    return <FormControl ref={target} className={"dropdown"}>{label && <InputLabel children={label} />}
            <Select className={"dropdown-select"} onChange={handleChange} value={value}>{renderDropdownOptions()}</Select>
        </FormControl>
}