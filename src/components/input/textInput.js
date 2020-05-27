import { TextField, ClickAwayListener } from "@material-ui/core"
import React, { useState } from "react";

export const TextInput = ({text, label, onBlur}) =>{
    const [value, setValue] = useState(text);
    const handleChange = e => setValue(e.target.value);
    const onClickAway = () => onBlur(value);

    return <ClickAwayListener onClickAway={onClickAway}><TextField label={label} value={value} onChange={handleChange}/></ClickAwayListener>;
}

export default TextInput;