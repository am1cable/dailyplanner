import React, { useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { OVERVIEW_1, CATEGORIZE_ACTIVITIES } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import debounce from 'lodash/debounce';
import "../../1_majorParts/majorParts/majorParts.scss";
import { CreateableList } from "../../../components/createableList/createableList";

export const ListActivities = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const dispatchSaveDay = (activitesInDay) => dispatch(saveDay({ ...currentDay, activitesInDay }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const createNewActivityInDay = ({list, id, value}) =>  [...list, { name: value, id, priorityIndex: list.length }];

    return <PageWrapper className="major-parts" back={{ link: OVERVIEW_1 }} forward={{ disabled: !currentDay.activitesInDay || currentDay.activitesInDay.length === 0, link: CATEGORIZE_ACTIVITIES }}>
        <div>Identify activities you want to do daily</div>
        <CreateableList list={currentDay.activitesInDay} onChange={saveDayDebounce} createNewItem={createNewActivityInDay} />
    </PageWrapper>
}
export default ListActivities