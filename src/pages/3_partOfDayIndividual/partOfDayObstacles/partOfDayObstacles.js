
import React, { useCallback, useState, useEffect, Fragment } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { PART_OF_DAY_BENEFITS, OBSTACLE_PROBLEMS } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { CreateableList } from "../../../components/createableList/createableList";
import { confidenceChoices } from "../confidenceCheck/confidenceCheck";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export const obstacleChoices = ["motivation", "systemic", "interpersonal", "personal", "other"];

export const PartOfDayObstacles = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const [currentDayObstacles, setCurrentDayObstacles] = useState(currentPartOfDay().obstacles || obstacleChoices.reduce((obj, choice) => ({ ...obj, [choice]: { checked: false } }), {}));

    const dispatchSaveDay = () => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), { ...currentPartOfDay(), obstacles: { ...currentDayObstacles } }]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    useEffect(() => { saveDayDebounce(); }, [currentDayObstacles])
    const onOtherChoicesChange = (otherChoices) => setCurrentDayObstacles({ ...currentDayObstacles, otherChoices })

    const renderText = () => {
        if (currentDay.confidence === 0) {
            return `If problems were to arise over the coming week, what kind of obstacles could appear for your ${currentPartOfDay().name} part of the day?`;
        } else {
            return `Considering you are ${confidenceChoices[currentDay.confidence]} confident in completing your day, what kind of potential obstacles do you anticipate for your ${currentPartOfDay().name} part of the day? `
        }
    }

    const toggleObstacle = (name) => (e) => {
        const checked = e.target.checked;
        const obstacles = { ...currentDayObstacles };
        obstacles[name].checked = checked;
        setCurrentDayObstacles({ ...obstacles });
    }

    const renderCheckbox = (name, index) => <div>
        <FormControlLabel key={index}
        control={
            <Checkbox
                checked={currentDayObstacles[name].checked}
                onChange={toggleObstacle(name)}
                name={name}
                color="primary"
            />
        }
        label={name}
    />
    </div>

    return <PageWrapper className="overview" back={{ link: PART_OF_DAY_BENEFITS }} forward={{ disabled: !obstacleChoices.find(name => currentDayObstacles[name].checked), link: OBSTACLE_PROBLEMS }}>
        <div>{renderText()}</div>
        {obstacleChoices.map(renderCheckbox)}
        {currentDayObstacles.other.checked && <Fragment>
            <div>What are the other obstacles you see arising?</div>
            <CreateableList list={currentDayObstacles.otherChoices || []} onChange={onOtherChoicesChange} />
        </Fragment>}
    </PageWrapper>
}
export default PartOfDayObstacles;