import React, { useState, useMemo, useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { START_OF_DAY } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import HourMinuteInput from "../../components/input/dropdown/hourMinuteInput";
import isEqual from "lodash/isEqual";
import { saveDay } from "../../actions";

export const StartTimes = () => {
    const currentDay = useSelector(state => state.currentDayData);
    
    const [startOfDay, setStartOfDay] = useState(currentDay.startOfDay || {hours: "", minutes: ""});

    return <PageWrapper back={{link: START_OF_DAY}}>start times</PageWrapper>
}
export default StartTimes 