import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { CONFIDENCE_CHECK, PART_OF_DAY_BENEFITS } from "../../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "../../../components/input/dropdown/dropdown";
import { saveDay } from "../../../actions";
import { debounce } from "lodash";
import { MenuItem } from "@material-ui/core";

export const confidenceChoices = ["Completely", "Mostly","Somewhat","A bit", "Not at all"];

export const SelectPartOfDay = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const [partOfDaySelected, setPartOfDaySelected] = useState(currentDay.partOfDaySelected);
    const dispatch = useDispatch();
    
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, partOfDaySelected: partOfDaySelected }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    useEffect(() => { saveDayDebounce(); }, [partOfDaySelected])

    const dropdownOptions = (options) => options.map(({name, id}, index) => <MenuItem key={index} value={id}>{name}</MenuItem>)

    return <PageWrapper className="overview" back={{ link: CONFIDENCE_CHECK }} forward={{ disabled: partOfDaySelected === undefined, link: PART_OF_DAY_BENEFITS }}>
        <div>If you could only accomplish one of the parts in your day, which would it be?</div>
        <Dropdown choice={partOfDaySelected} onChange={setPartOfDaySelected} dropdownOptions={dropdownOptions} options={currentDay.majorParts}/>
    </PageWrapper>
}
export default SelectPartOfDay