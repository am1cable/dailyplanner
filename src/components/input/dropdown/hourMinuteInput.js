import React, { useState, useEffect } from "react";
import { Dropdown } from "./dropdown";
import "./hourMinuteInput.scss";
import { hourOptions , minuteOptions } from "../../../utils/time";


export const HourMinuteInput = ({ hours: startHours = "", minutes: startMinutes = "", hourLabel="H", minuteLabel="M", onBlur, hourOptions: hoursAvailable=hourOptions, minuteOptions: minutesAvailable=minuteOptions, extra }) => {
    const [hours, setHours] = useState(startHours);
    const [minutes, setMinutes] = useState(startMinutes);

    useEffect(() => {
        onBlur({ hours, minutes });
    }, [hours, minutes])

    return <div className="hourminute-input">
        <Dropdown choice={hours} onChange={setHours} label={hourLabel} options={hoursAvailable} />
        <Dropdown choice={minutes} onChange={setMinutes} label={minuteLabel} options={minutesAvailable} />
        {extra && extra}
    </div>;
}
export default HourMinuteInput;