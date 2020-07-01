import React, { useState, useEffect } from "react";
import { Dropdown } from "./dropdown";
import "./hourMinuteInput.scss";
import { hourOptions } from "../../../utils/time";

export const HourInput = ({ hours: startHours = "", hourLabel="Hours", onBlur, hourOptions: hoursAvailable=hourOptions, extra }) => {
    const [hours, setHours] = useState(startHours);
    useEffect(() => {
        onBlur({ hours });
    }, [hours])

    return <div className="hourminute-input">
        <Dropdown choice={hours} onChange={setHours} label={hourLabel} options={hoursAvailable} />
        {extra && extra}
    </div>;
}
export default HourInput;