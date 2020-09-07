import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { CATEGORIZE_ACTIVITIES, OVERVIEW_2, SELECT_PART_OF_DAY } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";

export const confidenceChoices = ["Completely", "Mostly","Somewhat","A bit", "Not at all"];

export const ConfidenceCheck = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const [confidence, setConfidence] = useState(currentDay.confidence);
    const dispatch = useDispatch();
    
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, confidence }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    useEffect(() => { saveDayDebounce(); }, [confidence])

    return <PageWrapper className="overview" back={{ link: OVERVIEW_2 }} forward={{ disabled: confidence === undefined, link: SELECT_PART_OF_DAY }}>
        <div>How confident are you in your ability to follow through on this plan for the coming week?</div>
        <Dropdown choice={confidence} onChange={setConfidence} options={confidenceChoices}/>
    </PageWrapper>
}
export default ConfidenceCheck