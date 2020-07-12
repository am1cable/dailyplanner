import React, { useCallback, Fragment } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { SELECT_PART_OF_DAY, TIME_TO_ACT, PART_OF_DAY_LOOPING } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { getCurrentObstacle } from "../../../utils/obstacles";
import { confidenceChoices } from "../confidenceCheck/confidenceCheck";
import TextInput from "../../../components/input/textInput";

export const ConfidenceCheckProblem = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const dispatchSaveDay = ({actConfidence, actConfidenceNotes}) => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), { ...updatedCurrentPartOfDay({actConfidence, actConfidenceNotes}) }]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const currentObstacle = () => getCurrentObstacle(currentPartOfDay());
    const currentProblem = () => currentObstacle().problems.find(({ completed }) => !completed);

    const replaceOutcome = ({actConfidence: actConfidenceNew, actConfidenceNotes: actConfidenceNotesNew}) => ({ completed, actConfidence, actConfidenceNotes, ...props }) => {
        return !completed ? { ...props, completed, actConfidence: actConfidenceNew || actConfidence, actConfidenceNotes: actConfidenceNotesNew || actConfidenceNotes } : { ...props, actConfidence, actConfidenceNotes, completed };
    };
    
    const saveActConfidence = (actConfidence) => saveDayDebounce({actConfidence});
    const saveActConfidenceNotes = (actConfidenceNotes) => saveDayDebounce({actConfidenceNotes});

    const updatedCurrentPartOfDay = ({actConfidence, actConfidenceNotes}) => {
        if (currentObstacle().isGeneric) {
            const updatedObstacles = { ...currentPartOfDay().obstacles };
            updatedObstacles[currentObstacle().name].problems = updatedObstacles[currentObstacle().name].problems.map(replaceOutcome({actConfidence, actConfidenceNotes}));
            return { ...currentPartOfDay(), obstacles: { ...updatedObstacles } }
        } else {
            const updatedOtherChoices = [...currentPartOfDay().obstacles.otherChoices].map(({ id, problems, ...props }) => {
                return id === currentObstacle().id ? { problems: problems.map(replaceOutcome({actConfidence, actConfidenceNotes})), id, ...props } : { id, problems, ...props }
            });
            return { ...currentPartOfDay(), obstacles: { ...currentPartOfDay().obstacles, otherChoices: updatedOtherChoices } }
        }
    }

    return <PageWrapper className="overview" back={{ link: TIME_TO_ACT }} forward={{ disabled: currentProblem().actConfidence === undefined, link: PART_OF_DAY_LOOPING }}>
        <div>How confident are you in your ability to follow through on applying these solutions to {currentProblem().name} over the coming week?</div>
        <Dropdown choice={currentProblem().actConfidence} onChange={saveActConfidence} options={confidenceChoices} />
        {
            currentProblem().actConfidence && <Fragment>
                <div>Note down any concerns or ideas you have about applying these solutions to {currentProblem().name} over the coming week:</div>
                <TextInput multiline rowsMax={4} text={currentProblem().actConfidenceNotes} onBlur={saveActConfidenceNotes} />
            </Fragment>
        }
    </PageWrapper>
}
export default ConfidenceCheckProblem