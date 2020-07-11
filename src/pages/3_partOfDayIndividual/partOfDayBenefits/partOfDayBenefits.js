
import React, { useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { CATEGORIZE_ACTIVITIES, SELECT_PART_OF_DAY } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { CreateableList } from "../../../components/createableList/createableList";

export const PartOfDayBenefits = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const currentPartOfDay = () => currentDay.majorParts.find(({ id }) => id === currentDay.partOfDaySelected);
    const dispatchSaveDay = (benefits) => dispatch(saveDay({
        ...currentDay,
        majorParts: [...currentDay.majorParts.filter(({ id }) => id !== currentDay.partOfDaySelected), { ...currentPartOfDay(), benefits }]
    }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));

    return <PageWrapper className="overview" back={{ link: SELECT_PART_OF_DAY }} forward={{ disabled: true, link: CATEGORIZE_ACTIVITIES }}>
        <div>What are 3 or more personal benefits you want the {currentPartOfDay().name} part of your day to provide for you over the coming week?</div>
        <CreateableList list={currentPartOfDay().benefits || []} onChange={saveDayDebounce} />
    </PageWrapper>
}
export default PartOfDayBenefits