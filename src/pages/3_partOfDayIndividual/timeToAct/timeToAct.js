
import React, { useCallback, Fragment } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { CONFIDENCE_CHECK_PROBLEM, FIRST_STEPS } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { getCurrentObstacle } from "../../../utils/obstacles";
import TextInput from "../../../components/input/textInput";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import { MenuItem } from "@material-ui/core";

export const timeToActRegexReplace = "${partOfDay}";
export const timeToActOptions = ["Immediately when the problem arrises", "Before the end of ${partOfDay}", "By the end of the day", "By the end of the week", "Other"]

export const TimeToAct = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const dispatchSaveDay = ({timeToAct, timeToActOther}) => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), {...updatedCurrentPartOfDay({timeToAct, timeToActOther})}]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const currentObstacle = () => getCurrentObstacle(currentPartOfDay());
    const currentProblem = () => currentObstacle().problems.find(({completed}) => !completed);
    
    const replaceOutcome = ({timeToAct: timeToActNew, timeToActOther: timeToActOtherNew}) => ({completed, timeToAct, timeToActOther, ...props}) => {
        return !completed ? { ...props, completed, timeToAct: timeToActNew || timeToAct, timeToActOther: timeToActOtherNew || timeToActOther} : {...props, timeToAct, timeToActOther, completed};
    };

    const saveTimeToAct = (timeToAct) => saveDayDebounce({timeToAct});
    const saveTimeToActOther = (timeToActOther) => saveDayDebounce({timeToActOther});

    const updatedCurrentPartOfDay = ({timeToAct, timeToActOther}) => {
        if (currentObstacle().isGeneric) {
            const updatedObstacles = {...currentPartOfDay().obstacles};
            updatedObstacles[currentObstacle().name].problems = updatedObstacles[currentObstacle().name].problems.map(replaceOutcome({timeToAct, timeToActOther}));
            return { ...currentPartOfDay(), obstacles: {...updatedObstacles}}
        }else{
            const updatedOtherChoices = [...currentPartOfDay().obstacles.otherChoices].map(({id, problems, ...props}) => {
                return id === currentObstacle().id ? {problems: problems.map(replaceOutcome({timeToAct, timeToActOther})), id, ...props} : {id, problems, ...props}
            });
            return { ...currentPartOfDay(), obstacles: {...currentPartOfDay().obstacles, otherChoices: updatedOtherChoices}}
        }
    }
    const isOther = () => currentProblem().timeToAct === timeToActOptions.length - 1;
    const dropdownOptions = (options) => options.map((option, index) => <MenuItem key={index} value={index}>{option.replace(timeToActRegexReplace, currentPartOfDay().name)}</MenuItem>);

    return <PageWrapper className="overview" back={{ link: FIRST_STEPS }} forward={{ disabled: (!currentProblem().timeToAct || (isOther() && !currentProblem().timeToActOther)), link: CONFIDENCE_CHECK_PROBLEM }}>
        {currentProblem() && <Fragment>
            <div>What is one thing you can do to make {currentProblem().outcome} a more likely outcome should {currentProblem().name} occur?</div>
             <Dropdown choice={currentProblem().timeToAct} onChange={saveTimeToAct} options={timeToActOptions} dropdownOptions={dropdownOptions} />
             {isOther() && <TextInput text={currentProblem().timeToActOther} onBlur={saveTimeToActOther} />}
        </Fragment>
        }
    </PageWrapper>
}
export default TimeToAct;