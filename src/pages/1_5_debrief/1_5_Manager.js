import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, saveDay } from "../../actions";
import ContextWrapper from "../../components/context/contextWrapper";
import EnterFeedback from "./enterFeedback/enterFeedback";
import DayConfirmation from "./dayConfirmation/dayConfirmation"
import FinalizeDetails from "./finalizeDetails/finalizeDetails";

export const steps = {
    correct_type_of_day: 15,
    completion_rates: 16,
    duration_estimates: 17,
    time_estimates: 18,
    finalized_details: 19
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
        const nextStep = Object.values(steps)[currentStepData.step];
        nextStep && dispatch(setStep(nextStep))
    };
    const dispatchSaveFeedback = newFeedback => {
        dispatch(saveDay({
            ...currentDayData, "final": {
                ...currentDayData.final,
                feedback: [
                    ...currentDayData.final.feedback,
                    {
                        timestamp: new Date().toJSON(),
                        ...newFeedback
                    }
                ]
            }
        }));
    }
    const renderCurrentPage = () => {
        const Page = getCurrentPage(currentStepData.step);
        const finalChoiceDay = currentDayData["final"];
        return <Page finalDay={finalChoiceDay}
            saveFeedback={dispatchSaveFeedback} />
    }

    return <ContextWrapper context={{ onNavigateForwards: setNextStep, currentStepData }}>
        {currentDayFromStep(currentStepData.step) ? renderCurrentPage() : null}
    </ContextWrapper>
}

export default StructureDebriefManager;