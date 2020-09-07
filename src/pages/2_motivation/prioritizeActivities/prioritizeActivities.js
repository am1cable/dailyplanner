import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import {  CATEGORIZE_ACTIVITIES, PRIORITIZE_ACTIVITIES_TOP } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { saveDay } from "../../../actions";
import debounce from 'lodash/debounce';
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import "../categorizeActivities/categorizeActivities.scss";
import CategoryMenu from "../../../components/categoryMenu/categoryMenu";
import { priorities } from "../../../utils/activities";

export const localStorageId = 'activities-category';

const PrioritizeActivity = ({ name, priority, id, onChange }) => {
    const handleChange = (e) => {
        onChange({id, priority: e});
    }
    return <ListItem className="part">
        <ListItemText>{name}</ListItemText>
        <Dropdown
            choice={priority}
            onChange={handleChange}
            options={priorities}
            label={"Select from the options below."} />
    </ListItem>
}

export const PrioritizeActivities = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, activitesInDay }));
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const [currentCategory, setCurrentCategory] = useState(currentDay.majorParts.find(({ id }) => localStorage.getItem(localStorageId) === id) || currentDay.majorParts[0]);

    const handlePriorityChange = ({ id, priority }) => {
        setActivitysInDay([...activitesInDay.map(a => a.id !== id ? a : { ...a, priority })]);
    }
    useEffect(() => { saveDayDebounce()}, [activitesInDay])

    const handleCategoryChange = (newCategory) => {
        localStorage.setItem(localStorageId, newCategory.id);
        setCurrentCategory(newCategory);
    }

    const activitiesInCurrentCategory = () => activitesInDay.filter(({ categoryId }) => categoryId === currentCategory.id);
    const renderCategoryMenu = () => <CategoryMenu categories={currentDay.majorParts} currentCategory={currentCategory} onChange={handleCategoryChange} />

    return <PageWrapper className="major-parts" back={{ link: CATEGORIZE_ACTIVITIES }} forward={{ disabled: !activitesInDay.every(({priority}) => priority !== undefined), link: PRIORITIZE_ACTIVITIES_TOP }}>
        <div>Identify the priority of each activity in this section of your day</div>
        <List className="dropdown-list">
            {activitiesInCurrentCategory().map((activity, index) => <PrioritizeActivity key={index} {...activity} onChange={handlePriorityChange} />)}
        </List>
            {renderCategoryMenu()}
    </PageWrapper>
}
export default PrioritizeActivities