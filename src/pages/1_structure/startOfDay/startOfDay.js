import React, { useState, useMemo, useEffect } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { TOTAL_HOURS, OVERVIEW_1 } from "../../pageUrls";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";
import isEqual from "lodash/isEqual";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import "./startOfDay.scss";
import { hourOptionsStartOfDay, dayPeriod } from "../../../utils/time";

export const StartOfDay = ({currentDay, templateDay, saveDay}) => {
    const [startOfDay, setStartOfDay] = useState(currentDay.startOfDay || {hours: 6, minutes: 0});
    const [startOfDayPeriod, setStartOfDayPeriod] = useState(currentDay.startOfDayPeriod || 0);
    
    useEffect(() => {
        if (!isEqual(startOfDay, currentDay.startOfDay)) saveDay({...currentDay, startOfDay});
    }, [startOfDay]) 
    
    useEffect(() => {
        if (!isEqual(startOfDayPeriod, currentDay.startOfDayPeriod)) saveDay({...currentDay, startOfDayPeriod});
    }, [startOfDayPeriod]) 

    const renderAmPm = () =>  <Dropdown label={"Am/Pm"} onChange={setStartOfDayPeriod} choice={startOfDayPeriod} options={dayPeriod}/>

    return <PageWrapper className={'start-day'}  forward={{}}>
       <div> <p>When is the start of your day?</p><HourInput {...startOfDay} hourLabel={'Hour'} onBlur={setStartOfDay} hourOptions={hourOptionsStartOfDay} extra={renderAmPm()}/>
       </div>
    </PageWrapper>
}
export default StartOfDay 