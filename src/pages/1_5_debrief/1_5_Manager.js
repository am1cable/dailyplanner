import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, saveDay } from "../../actions";
import ContextWrapper from "../../components/context/contextWrapper";
import EnterFeedback from "./enterFeedback/enterFeedback";
import DayConfirmation from "./dayConfirmation/dayConfirmation"
import FinalizeDetails from "./finalizeDetails/finalizeDetails";
import { getScheduleByHours } from "../../utils/time";

export const steps = {
    correct_type_of_day: 15,
    completion_rates: 16,
    duration_estimates: 17,
    time_estimates: 18,
    finalized_details: 19
}

const feedbackDetailsPages = {
    [steps.completion_rates]: {
        text: "What were the completion rates for this part of the day?"
    },
    [steps.duration_estimates]: {
        text: "How accurate were your original duration estimates?"
    },
    [steps.time_estimates]: {
        text: "How accurate were your estimated start and end times?"
    }
}


export const getCurrentPage = currentStep => {
    switch (currentStep) {
        case steps.completion_rates:
        case steps.duration_estimates:
        case steps.time_estimates:
            return EnterFeedback;
        case steps.finalized_details:
            return FinalizeDetails;
        case steps.correct_type_of_day:
        default:
            return DayConfirmation;
    }
}

export const getDayType = (currentStep) => currentStep > steps.set_is_achievable ? "redone" : "initial";

export const StructureDebriefManager = () => {
    const currentStepData = useSelector(state => state.currentStepData);
    const currentDayData = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentDayFromStep = currentStep => currentDayData[getDayType(currentStep)] || {};

    useEffect(() => {
        (currentStepData.step < steps.correct_type_of_day || currentStepData.step > steps.finalized_details) && dispatch(setStep(steps.correct_type_of_day));
    }, []);

    const setNextStep = () => {
        const stepObjects = Object.values(steps);
        const nextStep = stepObjects[stepObjects.indexOf(currentStepData.step) + 1];
        nextStep && dispatch(setStep(nextStep))
    };
    const dispatchSaveFeedback = newFeedback => {
        debugger;
        dispatch(saveDay({
            ...currentDayData, "final": {
                ...currentDayData.final,
                feedback: [
                    ...(currentDayData.final.feedback || []),
                    ...newFeedback.map((feedback) => ({
                        timestamp: new Date().toJSON(),
                        ...feedback}))
                ]
            }
        }));
    }

    const getFeedbackDetails = currentData => {
        switch (currentStepData.step) {
            case steps.completion_rates:
                return [...currentData.majorParts.map(({ placeholder, name, id }) => ({ name: name || placeholder, id }))];
            case steps.duration_estimates:
                return [...currentData.majorPartDurations.map(({ hours, id }) => {
                    const majorPart = currentData.majorParts.find(({ id: mpId }) => mpId === id);
                    return { name: majorPart.name || majorPart.placeholder, id, subname: `${hours}h` }
                })];
            case steps.time_estimates:
                var scheduleByHour = getScheduleByHours(currentData);
                return [...scheduleByHour.filter(({ name }) => name).map(({ hour, ampm, id, name }, i) => {
                    const nextItem = scheduleByHour[i + 1];
                    return { id, name, subname: `${hour}${ampm} to ${nextItem.hour}${nextItem.ampm}` }
                })];
        }
    }
    const renderCurrentPage = () => {
        const Page = getCurrentPage(currentStepData.step);
        const finalChoiceDay = currentDayData["final"];
        const feedbackDetails = feedbackDetailsPages[currentStepData.step];
        const feedbackDetails2 = getFeedbackDetails(finalChoiceDay);
        return <Page finalDay={finalChoiceDay}
            finalDayDetails={feedbackDetails2}
            saveFeedback={dispatchSaveFeedback}
            feedbackDetails={{ ...feedbackDetails }} />
    }

    return <ContextWrapper context={{ onNavigateForwards: setNextStep, currentStepData }}>
        {currentDayFromStep(currentStepData.step) ? renderCurrentPage() : null}
    </ContextWrapper>
}

export default StructureDebriefManager;