import { TextField } from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react";
import "./textInput.scss";

export const TextInput = ({ text = "", forwardedRef, label, onBlur = () => {}, onChange = () => {}, clearInput = false, className, ...props }) => {
    const [value, setValue] = useState(text);
    const handleChange = e => setValue(e.target.value)
    const textInputRef = forwardedRef || useRef();
    const catchReturn = (e) => {
        if (e.key === 'Enter') {
            setValue(e.target.value);
            e.preventDefault();
            textInputRef.current && textInputRef.current.blur();
        }
    }
    const cleanUp = () => {
        clearInput && setValue(text);
        if (value !== text) onBlur(value);
    }

    useEffect(() => setValue(text), [text]);
    useEffect(() => {
        function sendValue() {
            if (value !== text) onChange(value);
        }
        sendValue();
        return sendValue;
    }, [value]);

    return <TextField {...props} inputRef={textInputRef} onKeyPress={catchReturn} className={`text-input${className ? " " + className : ''}`} onBlur={cleanUp} label={label} value={value} onChange={handleChange} />;
}

export default TextInput;