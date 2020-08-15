import React, { useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import debounce from 'lodash/debounce';
import "./majorParts.scss";
import { CreateableList } from "../../../components/createableList/createableList";

export const MajorParts = ({currentDay, templateDay, saveDay}) => {
    const dispatchSaveDay = (majorParts) => {
        saveDay({ ...currentDay, majorParts });
    }
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const createNewMajorPart = ({ list, id, value }) => [...list, { name: value, id, benefits: [], }];

    return <PageWrapper className="major-parts" forward={{ disabled: !currentDay.majorParts || currentDay.majorParts.length === 0 }}>
        <div>What are the major parts of this day? Maximum 7.</div>
        <CreateableList list={currentDay.majorParts} defaultList={templateDay.majorParts} maxItems={7} onChange={saveDayDebounce} createNewItem={createNewMajorPart} />
    </PageWrapper>
}
export default MajorParts