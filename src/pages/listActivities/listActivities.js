import React, { useState, useEffect, useCallback, useRef } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { START_TIMES, CATEGORIZE_ACTIVITIES } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../components/input/textInput";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, List, ListItem } from "@material-ui/core";
import { saveDay } from "../../actions";
import debounce from 'lodash/debounce';
import "../majorParts/majorParts.scss";
import { generateId } from "../../utils/id";

export const ListActivities = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay || []);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, activitesInDay }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const newActivityInput = useRef();

    useEffect(() => { saveDayDebounce(); }, [activitesInDay])

    const createNewActivityInDay = value => {
        setActivitysInDay([...activitesInDay, { name: value, id: generateId() }]);
        setTimeout(() => { newActivityInput.current && newActivityInput.current.focus(); }, 50);
    }
    const updateActivityInDay = index => value => {
        const newActivitysInDay = [...activitesInDay];
        const oldActivitysInDay = newActivitysInDay.splice(index, 1);
        newActivitysInDay.splice(index, 0, { name: value, id: oldActivitysInDay[0].id });
        setActivitysInDay([...newActivitysInDay]);
    }
    const removeActivity = index => () => {
        const newActivitysInDay = [...activitesInDay];
        newActivitysInDay.splice(index, 1);
        setActivitysInDay([...newActivitysInDay]);
    }
    const renderDeleteButton = (index) => <IconButton onClick={removeActivity(index)} aria-label="delete">
        <DeleteIcon fontSize="small" />
    </IconButton>

    const renderCurrentActivitysInDay = () => activitesInDay.map((part, index) => <ListItem className="part" key={index}><TextInput label={index + 1} text={part.name} onChange={updateActivityInDay(index)} /> {renderDeleteButton(index)} </ListItem>);

    return <PageWrapper className="major-parts" back={{ link: START_TIMES }} forward={{ disabled: !currentDay.activitesInDay || currentDay.activitesInDay.length === 0, link: CATEGORIZE_ACTIVITIES }}>
        <div>Identify activities you want to do daily</div>
        <List>{renderCurrentActivitysInDay()}
        <ListItem> <TextInput forwardedRef={newActivityInput} autoFocus text="" label={activitesInDay.length + 1} clearInput onBlur={createNewActivityInDay} /></ListItem>
        </List>
    </PageWrapper>
}
export default ListActivities