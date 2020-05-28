import React, { useState, useMemo, useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { TOTAL_HOURS, START_TIMES } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import HourMinuteInput from "../../components/input/dropdown/hourMinuteInput";
import isEqual from "lodash/isEqual";
import { saveDay } from "../../actions";
import { Dropdown } from "../../components/input/dropdown/dropdown";
import "./startOfDay.scss";

export const hourOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const StartOfDay = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [startOfDay, setStartOfDay] = useState(currentDay.startOfDay || {hours: 6, minutes: 0});
    const [startOfDayPeriod, setStartOfDayPeriod] = useState(currentDay.startOfDayPeriod || 0);
    const isMissingHours = useMemo(() => startOfDay.hours === "" || startOfDay.minutes === "", [startOfDay]);
    
    useEffect(() => {
        if (!isEqual(startOfDay, currentDay.startOfDay)) dispatch(saveDay({...currentDay, startOfDay}));
    }, [startOfDay]) 
    
    useEffect(() => {
        if (!isEqual(startOfDayPeriod, currentDay.startOfDayPeriod)) dispatch(saveDay({...currentDay, startOfDayPeriod}));
    }, [startOfDayPeriod]) 

    const renderAmPm = () =>  <Dropdown label={"Am/Pm"} onChange={setStartOfDayPeriod} choice={startOfDayPeriod} options={["am", "pm"]}/>

    return <PageWrapper className={'start-day'} back={{link: TOTAL_HOURS}} forward={{disabled: isMissingHours, link: START_TIMES}}>
       <div> <p>When is the start of your day?</p><HourMinuteInput {...startOfDay} hourLabel={'Hour'} minuteLabel={'Half hour'} onBlur={setStartOfDay} hourOptions={hourOptions} extra={renderAmPm()}/>
       </div>
    </PageWrapper>
}
export default StartOfDay 