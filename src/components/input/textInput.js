import { TextField, ClickAwayListener } from "@material-ui/core"
import React, { useState, useEffect } from "react";

export const TextInput = ({ text, label, onBlur, clearInput }) => {
    const [value, setValue] = useState(text);
    const [focused, setFocused] = useState(false);
    useEffect(() => setValue(text), [text]);

    const handleChange = e => setValue(e.target.value);
    const onClickAway = () => {
        if (value !== text && focused) {
            const finalValue = value;
            clearInput && setValue(text);
            setFocused(false);
            onBlur(finalValue);
        }
    };

    return <ClickAwayListener onClickAway={onClickAway} ><TextField onClick={() => setFocused(true)} label={label} value={value} onChange={handleChange} /></ClickAwayListener>;
}

export default TextInput;