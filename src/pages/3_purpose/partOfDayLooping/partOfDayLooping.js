import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { getCurrentObstacle } from "../../../utils/obstacles";
import { CONFIDENCE_CHECK_PROBLEM, DESIRED_OUTCOME, TYPE_OF_DAY } from "../../pageUrls";
import { Redirect } from "react-router-dom";

export const PartOfDayLooping = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [nextProblem, setNextProblem] = useState();

    useEffect(() => {
        const updatedCurrentPartOfDay = [...currentDay.majorParts].find(({ id }) => id === currentDay.partOfDaySelected);
        const currentObstacle = getCurrentObstacle(updatedCurrentPartOfDay);
        if (currentObstacle) {
            const currentProblem = currentObstacle.problems.find(({ completed }) => !completed);
            currentProblem.completed = true;
            const updatedCurrentObstacle = {
                ...currentObstacle,
                problems: currentObstacle.problems.map(({ id, ...props }) => id === currentProblem.id ? currentProblem : { id, ...props })
            };
            var newNextProblem = updatedCurrentObstacle.problems.find(({ completed }) => !completed);

            if (!newNextProblem) {
                if (currentObstacle.isGeneric) {
                    updatedCurrentPartOfDay.obstacles[currentObstacle.name] = {
                        ...updatedCurrentObstacle,
                        completed: true,
                    };
                }
                else {
                    updatedCurrentPartOfDay.obstacles.otherChoices = updatedCurrentPartOfDay.obstacles.otherChoices.map(({ id, ...props }) => {
                        return id === currentObstacle.id ? { ...props, ...updatedCurrentObstacle, id, completed: true } : { ...props, id }
                    });
                }
            }
            const nextCurrentObstacle = getCurrentObstacle(updatedCurrentPartOfDay);
            if (nextCurrentObstacle) newNextProblem = nextCurrentObstacle.problems.find(({ completed }) => !completed);

            dispatch(saveDay({
                ...currentDay,
                majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), { ...updatedCurrentPartOfDay }]
            }))
        }

        if (newNextProblem) setNextProblem(true);
        else setNextProblem(false);
    }, []);

    return <Fragment>{nextProblem === false ? <Redirect to={TYPE_OF_DAY} /> : nextProblem ? <Redirect to={DESIRED_OUTCOME} /> : null}</Fragment>
}
export default PartOfDayLooping