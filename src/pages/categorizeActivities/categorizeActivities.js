import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { LIST_ACTIVITIES, PRIORITIZE_ACTIVITIES } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, MenuItem } from "@material-ui/core";
import { saveDay } from "../../actions";
import debounce from 'lodash/debounce';
import { Dropdown } from "../../components/input/dropdown/dropdown";
import "./categorizeActivities.scss";

export const CategorizeActivities = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, activitesInDay }));
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const handleCategoryChange = (id) => (categoryId) => setActivitysInDay([...activitesInDay.map(a => a.id !== id ?  a : { ...a, categoryId })]);

    useEffect(() => { saveDayDebounce() }, [activitesInDay])

    const overrideDropdownOptions = (options) => options.map(({ name, id }, index) => <MenuItem key={id} value={id}>{name}</MenuItem>)

    const renderCurrentActivitysInDay = () => activitesInDay.map(({ name, id, categoryId }, index) => <ListItem className="part" key={index}>
        <ListItemText>{name}</ListItemText>
        <Dropdown
            dropdownOptions={overrideDropdownOptions}
            choice={categoryId}
            onChange={handleCategoryChange(id)}
            options={currentDay.majorParts}
            label={"Select from the options below."} />
    </ListItem>);

    return <PageWrapper className="categorize-activities" back={{ link: LIST_ACTIVITIES }} forward={{ disabled: !activitesInDay.every(({ categoryId }) => categoryId !== undefined), link: PRIORITIZE_ACTIVITIES }}>
        <div>Identify activities you want to do daily</div>
        <List className="dropdown-list">
            {renderCurrentActivitysInDay()}
        </List>
    </PageWrapper>
}
export default CategorizeActivities