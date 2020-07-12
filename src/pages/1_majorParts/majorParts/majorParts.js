import React, { useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { TYPE_OF_DAY, MAJOR_PARTS_DURATION } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import debounce from 'lodash/debounce';
import "./majorParts.scss";
import { CreateableList } from "../../../components/createableList/createableList";

export const MajorParts = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const dispatchSaveDay = (majorParts) => dispatch(saveDay({ ...currentDay, majorParts }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const createNewMajorPart = ({ list, id, value }) => [...list, { name: value, id, benefits: [], }];

    return <PageWrapper className="major-parts" back={{ link: TYPE_OF_DAY }} forward={{ disabled: !currentDay.majorParts || currentDay.majorParts.length === 0, link: MAJOR_PARTS_DURATION }}>
        <div>What are the major parts of this day? Maximum 7.</div>
        <CreateableList list={currentDay.majorParts} maxItems={7} onChange={saveDayDebounce} createNewItem={createNewMajorPart} />
    </PageWrapper>
}
export default MajorParts