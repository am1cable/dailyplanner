import React from "react";
import { Slider } from "@material-ui/core";

export const defaultConfidenceChoices = [
    {
        label: "Not at all",
        value: 0
    },
    {
        label: "A bit",
        value: 25,
    },
    {
        label: "Somewhat",
        value: 50
    },
    {
        label: "Mostly",
        value: 75
    },
    {
        label: "Completely",
        value: 100
    }
];


export const ConfidenceSlider = ({ onChange, defaultValue = 75, confidenceChoices = defaultConfidenceChoices }) => {
    const handleChange = (e, newValue) => onChange(newValue); 
    return <Slider
        defaultValue={defaultValue}
        step={null}
        onChangeCommitted={handleChange}
        marks={confidenceChoices}
    />}

export default ConfidenceSlider;