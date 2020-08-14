
import React, { useCallback, Fragment, useMemo, useEffect } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { PART_OF_DAY_OBSTACLES, OBSTACLE_PROBLEMS, FIRST_STEPS } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { getCurrentObstacle } from "../../../utils/obstacles";
import TextInput from "../../../components/input/textInput";

export const DesiredOutcome = () => {
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
    
    const replaceOutcome = (outcome) => ({completed, ...props}) => {
        return !completed ? { ...props, completed, outcome} : {...props, completed};
    };

    const updatedCurrentPartOfDay = (outcome) => {
        if (currentObstacle().isGeneric) {
            const updatedObstacles = {...currentPartOfDay().obstacles};
            updatedObstacles[currentObstacle().name].problems = updatedObstacles[currentObstacle().name].problems.map(replaceOutcome(outcome));
            return { ...currentPartOfDay(), obstacles: {...updatedObstacles}}
        }else{
            const updatedOtherChoices = [...currentPartOfDay().obstacles.otherChoices].map(({id, problems, ...props}) => {
                return id === currentObstacle().id ? {problems: problems.map(replaceOutcome(outcome)), id, ...props} : {id, problems, ...props}
            });
            return { ...currentPartOfDay(), obstacles: {...currentPartOfDay().obstacles, otherChoices: updatedOtherChoices}}
        }
    }

    return <PageWrapper className="overview" back={{ link: OBSTACLE_PROBLEMS }} forward={{ disabled: !currentProblem().outcome, link: FIRST_STEPS }}>
        {currentProblem() && <Fragment>
            <div>What outcome would you like to have in place of {currentProblem().name}?</div>
            <TextInput multiline rowsMax={4} text={currentProblem().outcome} onBlur={saveDayDebounce} />
        </Fragment>
        }
    </PageWrapper>
}
export default DesiredOutcome;