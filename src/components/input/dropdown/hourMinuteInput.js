import React, { useState, useEffect } from "react";
import { Dropdown } from "./dropdown";
import "./hourMinuteInput.scss";

export const HourMinuteInput = ({props}) => {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    return <div className="hourminute-input"><Dropdown choice={hours} options={["0","1","2","3","4","5"]}/><p>H</p><Dropdown choice={minutes} options={["00", "30"]}/><p>M</p></div>
}

export default HourMinuteInput;