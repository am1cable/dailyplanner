
import React, { useCallback, Fragment } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { DESIRED_OUTCOME, TIME_TO_ACT } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { getCurrentObstacle } from "../../../utils/obstacles";
import TextInput from "../../../components/input/textInput";

export const FirstSteps = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const dispatchSaveDay = (problems) => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), {...updatedCurrentPartOfDay(problems)}]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const currentObstacle = () => getCurrentObstacle(currentPartOfDay());
    const currentProblem = () => currentObstacle().problems.find(({completed}) => !completed);
    
    const replaceOutcome = (firstSteps) => ({completed, ...props}) => {
        return !completed ? { ...props, completed, firstSteps} : {...props, completed};
    };

    const updatedCurrentPartOfDay = (firstSteps) => {
        if (currentObstacle().isGeneric) {
            const updatedObstacles = {...currentPartOfDay().obstacles};
            updatedObstacles[currentObstacle().name].problems = updatedObstacles[currentObstacle().name].problems.map(replaceOutcome(firstSteps));
            return { ...currentPartOfDay(), obstacles: {...updatedObstacles}}
        }else{
            const updatedOtherChoices = [...currentPartOfDay().obstacles.otherChoices].map(({id, problems, ...props}) => {
                return id === currentObstacle().id ? {problems: problems.map(replaceOutcome(firstSteps)), id, ...props} : {id, problems, ...props}
            });
            return { ...currentPartOfDay(), obstacles: {...currentPartOfDay().obstacles, otherChoices: updatedOtherChoices}}
        }
    }

    return <PageWrapper className="overview" back={{ link: DESIRED_OUTCOME }} forward={{ disabled: !currentProblem().firstSteps, link: TIME_TO_ACT }}>
        {currentProblem() && <Fragment>
            <div>What is one thing you can do to make {currentProblem().outcome} a more likely outcome should {currentProblem().name} occur?</div>
            <TextInput multiline rowsMax={4} text={currentProblem().firstSteps} onBlur={saveDayDebounce} />
        </Fragment>
        }
    </PageWrapper>
}
export default FirstSteps;