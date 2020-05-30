import React, { useEffect, useState } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { useSelector, useDispatch } from "react-redux";
import { saveAll, setDay } from "../../actions";
import { Dropdown } from "../../components/input/dropdown/dropdown";
import TextInput from "../../components/input/textInput";
import { MAJOR_PARTS } from "../pageUrls";

export const TypeOfDay = () => {
    const pageData = useSelector(state => state.pageData);
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const dropdownDayTypes = () => pageData.dayTypeOptions.filter(o => o !== '');

    const handleTypeChange = value => {
        updateAllTypes({ ...pageData, dayTypeChoice: value });
    }
    const handleOtherChange = value => {
        const newDayTypeOptions = [...pageData.dayTypeOptions];
        newDayTypeOptions.splice(pageData.dayTypeOptions.length - 1, 0, value);
        updateAllTypes({ ...pageData, dayTypeOptions: newDayTypeOptions, dayTypeChoice: newDayTypeOptions.length - 2 });
    };

    const updateAllTypes = (props) => {
        dispatch(saveAll({ ...props, dayTypeDetails: [...pageData.dayTypeDetails.filter(details => details.type !== currentDay.type), currentDay] }));
        dispatch(setDay(pageData.dayTypeDetails.find(detail => detail.type === pageData.dayTypeChoice) || { type: pageData.dayTypeChoice }));
    }

    const renderOtherChoice = () => <div>
        {pageData.dayTypeChoice === (pageData.dayTypeOptions.length - 1) ?
            <TextInput label={"What kind of day is it?"} onBlur={handleOtherChange} />
            : null}</div>

    return <PageWrapper
        forward={{ link: MAJOR_PARTS, disabled: currentDay.type === undefined}}>
        <div>What type of day do you want?</div>
        <Dropdown choice={pageData.dayTypeChoice || ""} onChange={handleTypeChange} options={dropdownDayTypes()} label={"Select from the options below."} />
        {renderOtherChoice()}
    </PageWrapper>
}
export default TypeOfDay