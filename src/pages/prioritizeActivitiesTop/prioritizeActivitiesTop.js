import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { CATEGORIZE_ACTIVITIES } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, RootRef, Portal } from "@material-ui/core";
import { saveDay } from "../../actions";
import debounce from 'lodash/debounce';
import "../categorizeActivities/categorizeActivities.scss";
import CategoryMenu from "../../components/categoryMenu/categoryMenu";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const priorities = ["Must Have", "Nice to Have"];
const localStorageId = 'prioritizeActivities-category';

const PortalAwareDraggable = ({ provided, snapshot, children }) => {
    return snapshot.isDragging ? <Portal>{children}</Portal> : children;
}

export const PrioritizeActivitiesTop = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, activitesInDay }));
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const [currentCategory, setCurrentCategory] = useState(currentDay.majorParts.find(({ id }) => localStorage.getItem(localStorageId) === id) || currentDay.majorParts[0]);

    useEffect(() => { saveDayDebounce(); console.log(activitesInDay.map(({ priority }) => priorities[priority])) }, [activitesInDay])

    const handleCategoryChange = (newCategory) => {
        localStorage.setItem(localStorageId, newCategory.id);
        setCurrentCategory(newCategory);
    }

    const activitiesInCurrentCategory = () => activitesInDay.filter(({ categoryId }) => categoryId === currentCategory.id);
    const renderCategoryMenu = () => <CategoryMenu categories={currentDay.majorParts} currentCategory={currentCategory} onChange={handleCategoryChange} />

    const onDragEnd = ({source, destination}) => {
        if (!destination) {
            return;
        }
        const [list, startIndex, endIndex] = [activitesInDay, source.index, destination.index];
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setActivitysInDay(result);
    }

    const renderActivities = () => activitiesInCurrentCategory().map(({ name, priority, id }, index) =>
        <Draggable isDragDisabled={activitiesInCurrentCategory().length === 1} key={id} draggableId={id} index={index}>{
            (provided, snapshot) => <PortalAwareDraggable
                snapshot={snapshot}
                provided={provided}>
                <ListItem className="part"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <ListItemText>{index} - {name}</ListItemText>
                </ListItem>
            </PortalAwareDraggable>
        }</Draggable>)

    return <PageWrapper className="major-parts" back={{ link: CATEGORIZE_ACTIVITIES }} /*forward={{ disabled: !activitesInDay.every(({priority}) => priority !== undefined), link: MAJOR_PARTS_DURATION }}*/>
        <div>Identify the priority of each activity in this section of your day</div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) =>
                    <RootRef rootRef={provided.innerRef}>
                        <List>
                            {renderActivities()}
                            {provided.placeholder}
                        </List>
                    </RootRef>}
            </Droppable>
        </DragDropContext>
        {renderCategoryMenu()}
    </PageWrapper>
}
export default PrioritizeActivitiesTop