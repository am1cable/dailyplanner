import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HoursOfSleep from "./hoursOfSleep/hoursOfSleep";
import MajorParts from "./majorParts/majorParts";
import MajorPartsDuration from "./majorParts/majorPartsDuration";
import StartOfDay from "./startOfDay/startOfDay";
import TypeOfDay from "./typeOfDay/typeOfDay";
import TotalHours from "./totalHours/totalHours";
import StartTimes from "./startTimes/startTimes";
import { setStep, saveDay } from "../../actions";
import StructureContext from "../../components/context/structureContext";
import HowAchievable from "./howAchievable/howAchievable";

export const steps = {
    set_type_of_day: 1,
    set_major_parts_of_ideal: 2,
    set_major_parts_duration_ideal: 3,
    set_hours_of_sleep_ideal: 4,
    show_total_hours_ideal: 5,
    set_start_of_day_ideal: 6,
    set_is_achievable: 7,
    set_major_parts_of_real: 8,
    set_major_parts_duration_real: 9,
    set_hours_of_sleep_real: 10,
    show_total_hours_real: 11,
    set_start_of_day_real: 12,
    show_start_times: 13
}

export const getCurrentPage = currentStep => {
    switch (currentStep) {
        case steps.set_major_parts_of_ideal:
        case steps.set_major_parts_of_real:
            return MajorParts;
        case steps.set_major_parts_duration_ideal:
        case steps.set_major_parts_duration_real:
            return MajorPartsDuration;
        case steps.set_hours_of_sleep_ideal:
        case steps.set_hours_of_sleep_real:
            return HoursOfSleep;
        case steps.show_total_hours_ideal:
        case steps.show_total_hours_real:
            return TotalHours;
        case steps.set_start_of_day_ideal:
        case steps.set_start_of_day_real:
            return StartOfDay;
        case steps.show_start_times:
            return StartTimes;
        case steps.set_is_achievable:
            return HowAchievable;
        case steps.set_type_of_day:
        default:
            return TypeOfDay;
    }
}

export const ContextWrapper = ({ context, children }) => {
    const [structureContext, setStructureContext] = useState(context);
    
    return <StructureContext.Provider value={structureContext}>
        {children}
    </StructureContext.Provider>
}

export const getDayType = (currentStep) => currentStep > steps.set_is_achievable ? "real" : "ideal";


//TODO: bug: have to refresh the page to be able to click forwards and it to work .... bweh?
// something with useSelector, maybe if i put current step inside an object idek
export const StructureManager = () => {
    const currentStep = useSelector(state => state.currentStepData);
    const currentDayData = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentDayFromStep = currentStep => currentDayData[getDayType(currentStep)] || {};

    const setNextStep = () => {
        const nextStep = Object.values(steps)[currentStep];
        nextStep && dispatch(setStep(nextStep))
    };
    const dispatchSaveDay = currentDay => {
        dispatch(saveDay({ ...currentDayData, [getDayType(currentStep)]: currentDay }));
    }
    const renderCurrentPage = () => {
        const Page = getCurrentPage(currentStep);
        const templateDay = getDayType(currentStep) === "real" ? currentDayData["ideal"] : {};
        return <Page currentDay={currentDayFromStep(currentStep)} saveDay={dispatchSaveDay} templateDay={templateDay} />
    }

    return <ContextWrapper context={{ onNavigateForwards: setNextStep }}>
        {currentDayFromStep(currentStep) ? renderCurrentPage() : null}
    </ContextWrapper>
}

export default StructureManager;