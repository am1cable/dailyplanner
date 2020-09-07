import React, { useState, useEffect } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";
import isEqual from "lodash/isEqual";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import "./startOfDay.scss";
import { hourOptionsStartOfDay, dayPeriod } from "../../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../actions";
import { steps, ContextWrapper } from "../structureManager";

export const StartOfDay = ({ currentDay, templateDay, saveDay }) => {
    const currentDayAll = useSelector(state => state.currentDayData);
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
        debugger;
        if (currentDayAll.initialDayConfidence >= 25) {
            dispatch(setStep(steps.set_real_or_ideal));
        } else {
            dispatch(setStep(steps.show_start_times));
        }
    };

    const renderAmPm = () => <Dropdown label={"Am/Pm"} onChange={setStartOfDayPeriod} choice={startOfDayPeriod} options={dayPeriod} />

    return <ContextWrapper context={{ onNavigateForwards: setNextStep }}>
        <PageWrapper className={'start-day'} forward={{}}>
            <div> <p>When is the start of your day?</p><HourInput {...startOfDay} hourLabel={'Hour'} onBlur={setStartOfDay} hourOptions={hourOptionsStartOfDay} extra={renderAmPm()} />
            </div>
        </PageWrapper>
    </ContextWrapper>
}
export default StartOfDay 