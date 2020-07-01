import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { PRIORITIZE_ACTIVITIES, ALL_ACTIVITIES } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, RootRef, Portal, ListItemAvatar, Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { saveDay } from "../../actions";
import debounce from 'lodash/debounce';
import CategoryMenu from "../../components/categoryMenu/categoryMenu";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./prioritizeActivitiesTop.scss";
import { priorities, priorityNames } from "../prioritizeActivities/prioritizeActivities";
import { prioritizedActivities } from "../../utils/activities";
import {localStorageId} from "../prioritizeActivities/prioritizeActivities";

const useStyles = makeStyles((theme) => ({
    top3Icon: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const PortalAwareDraggable = ({ provided, snapshot, children }) => {
    return snapshot.isDragging ? <Portal>{children}</Portal> : children;
}

export const PrioritizeActivitiesTop = () => {
    const classes = useStyles();
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, activitesInDay }));
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const [currentCategory, setCurrentCategory] = useState(currentDay.majorParts.find(({ id }) => localStorage.getItem(localStorageId) === id) || currentDay.majorParts[0]);

    const highPriorityActivities = ({ priority }) => priority === priorities.indexOf(priorityNames.must_have);
    const activitiesInCurrentCategory = (targetCategory = currentCategory) => activitesInDay.filter(({ categoryId }) => categoryId === targetCategory.id);

    useEffect(() => { saveDayDebounce() }, [activitesInDay])

    const handleCategoryChange = (newCategory) => {
        localStorage.setItem(localStorageId, newCategory.id);
        setCurrentCategory(newCategory);
    }

    const onDragEnd = ({ source, destination }) => {
        if (!destination) {
            return;
        }
        const [list, startIndex, endIndex] = [activitiesInCurrentCategory().sort(prioritizedActivities).filter(highPriorityActivities), source.index, destination.index];
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        const activitiesWithNewIndexes = activitesInDay.map(activity => ({
            ...activity,
            priorityIndex: result.indexOf(result.find(({ id }) => activity.id === id))
        }));
        setActivitysInDay(activitiesWithNewIndexes);
    }

    const renderCategoryMenu = () => <CategoryMenu categories={currentDay.majorParts} currentCategory={currentCategory} onChange={handleCategoryChange} />
    const renderHighPriorityActivities = () => activitiesInCurrentCategory().sort(prioritizedActivities).filter(highPriorityActivities).map(({ name, priority, id, priorityIndex }, index) =>
        <Draggable isDragDisabled={activitiesInCurrentCategory().filter(highPriorityActivities).length === 1} key={id} draggableId={id} index={priorityIndex || index}>{
            (provided, snapshot) => <PortalAwareDraggable
                snapshot={snapshot}
                provided={provided}>
                <ListItem className={`high-priority part ${index}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <ListItemAvatar><Avatar className={index < 3 ? classes.top3Icon : ''}>{index + 1}</Avatar></ListItemAvatar>
                    <ListItemText>{name}</ListItemText>
                </ListItem>
            </PortalAwareDraggable>
        }</Draggable>)

    const renderLowPriorityActivities = () => activitiesInCurrentCategory().filter((a) => !highPriorityActivities(a)).map(({ name, priority, id }, index) =>
        <ListItem key={index} className={`low-priority part ${activitiesInCurrentCategory().filter(highPriorityActivities).length + index}`}>
            <ListItemText primaryTypographyProps={{ color: 'textSecondary' }}>{name}</ListItemText>
        </ListItem>)

    return <PageWrapper className="prioritize-activities-top" back={{ link: PRIORITIZE_ACTIVITIES }} forward={{ disabled: !activitesInDay.filter(highPriorityActivities).every(({ priorityIndex }) => priorityIndex !== undefined), link: ALL_ACTIVITIES }} >
        <div>Drag and drop to identify the priority of each <strong>{priorityNames.must_have}</strong> activity in this section of your day</div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) =>
                    <RootRef rootRef={provided.innerRef}>
                        <List>
                            {renderHighPriorityActivities()}
                            {provided.placeholder}
                        </List>
                    </RootRef>}
            </Droppable>
        </DragDropContext>
        {renderCategoryMenu()}
    </PageWrapper>
}
export default PrioritizeActivitiesTop