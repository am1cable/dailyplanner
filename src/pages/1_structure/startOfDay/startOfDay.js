import React, { useState, useEffect } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";
import isEqual from "lodash/isEqual";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import "./startOfDay.scss";
import { hourOptionsStartOfDay, dayPeriod } from "../../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../actions";
import { steps } from "../1_Manager";
import ContextWrapper from "../../../components/context/contextWrapper";

export const StartOfDay = ({ currentDay, templateDay, saveDay }) => {
    const currentDayData = useSelector(state => state.currentDayData);
    const [startOfDay, setStartOfDay] = useState(currentDay.startOfDay || templateDay.startOfDay || { hours: 6, minutes: 0 });
    const [startOfDayPeriod, setStartOfDayPeriod] = useState(currentDay.startOfDayPeriod || 0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEqual(startOfDay, currentDay.startOfDay)) saveDay({ ...currentDay, startOfDay });
    }, [startOfDay])

    useEffect(() => {
        if (!isEqual(startOfDayPeriod, currentDay.startOfDayPeriod)) saveDay({ ...currentDay, startOfDayPeriod });
    }, [startOfDayPeriod])

    const setNextStep = () => {
        if (!currentDayData.initialDayConfidence){
            dispatch(setStep(steps.set_is_achievable));
        }
        else if (currentDayData.initialDayConfidence >= 25) {
            dispatch(setStep(steps.set_real_or_ideal));
        } else {
            dispatch(setDay({...currentDayData, "final": currentDay}));
            dispatch(setStep(steps.show_final_plan));
        }
    };

    const renderAmPm = () => <Dropdown label={"Am/Pm"} onChange={setStartOfDayPeriod} choice={startOfDayPeriod} options={dayPeriod} />

    return <ContextWrapper context={{ onNavigateForwards: setNextStep }}>
        <PageWrapper className={'start-day'} forward={{disabled: !currentDay.startOfDay}}>
            <div> <p>When is the start of your day?</p><HourInput {...startOfDay} hourLabel={'Hour'} onBlur={setStartOfDay} hourOptions={hourOptionsStartOfDay} extra={renderAmPm()} />
            </div>
        </PageWrapper>
    </ContextWrapper>
}
export default StartOfDay 