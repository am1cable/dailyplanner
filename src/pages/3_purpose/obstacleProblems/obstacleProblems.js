
import React, { useCallback, Fragment, useMemo } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { PART_OF_DAY_OBSTACLES, DESIRED_OUTCOME } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { CreateableList } from "../../../components/createableList/createableList";
import { getCurrentObstacle } from "../../../utils/obstacles";

export const ObstacleProblems = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const dispatchSaveDay = (problems) => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), {...updatedCurrentPartOfDay(problems)}]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const currentObstacle = useMemo(() => getCurrentObstacle(currentPartOfDay()), [currentDay]);

    const updatedCurrentPartOfDay = (problems) => {
        if (currentObstacle.isGeneric) {
            const updatedObstacles = {...currentPartOfDay().obstacles};
            updatedObstacles[currentObstacle.name].problems = problems;
            return { ...currentPartOfDay(), obstacles: {...updatedObstacles}}
        }else{
            const updatedOtherChoices = [...currentPartOfDay().obstacles.otherChoices].map(({id, ...props}) => {
                return id === currentObstacle.id ? {problems, id, ...props} : {id, ...props}
            });
            return { ...currentPartOfDay(), obstacles: {...currentPartOfDay().obstacles, otherChoices: updatedOtherChoices}}
        }
    }

    return <PageWrapper className="overview" back={{ link: PART_OF_DAY_OBSTACLES }} forward={{ disabled: (currentObstacle.problems || []).length === 0, link: DESIRED_OUTCOME }}>
        {currentObstacle && <Fragment>
            <div>What specific {currentObstacle.name} problems do you anticipate as possible obstructions to your {currentPartOfDay().name} part of day in the coming week?</div>
            <CreateableList list={currentObstacle.problems || []} onChange={saveDayDebounce} />
        </Fragment>
        }
    </PageWrapper>
}
export default ObstacleProblems;