import React, { useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { useSelector, useDispatch } from "react-redux";
import { saveAll } from "../../actions";
import { Dropdown } from "../../components/dropdown/dropdown";
import TextInput from "../../components/input/textInput";
import { MAJOR_PARTS } from "../pageUrls";

export const TypeOfDay = () => {
    const pageData = useSelector(state => state.pageData);
    const dispatch = useDispatch();
    const dropdownDayTypes = () => pageData.dayTypeOptions.filter(o => o !== '');

    const handleTypeChange = value => dispatch(saveAll({ ...pageData, dayTypeChoice: value }));
    const handleOtherChange = value => {
        const newDayTypeOptions = [...pageData.dayTypeOptions];
        newDayTypeOptions.splice(pageData.dayTypeOptions.length -1, 0, value);
        dispatch(saveAll({ ...pageData, dayTypeOptions: newDayTypeOptions, dayTypeChoice: newDayTypeOptions.length - 2 }))
    };

    const renderOtherChoice = () => <div>
        {pageData.dayTypeChoice === (pageData.dayTypeOptions.length - 1) ?
            <TextInput label={"What kind of day is it?"} text={pageData.dayTypeChoice} onBlur={handleOtherChange} />
            : null}</div>

    return <PageWrapper
        forward={{ link: MAJOR_PARTS}}>
        <div>What type of day do you want?</div>
        <Dropdown choice={pageData.dayTypeChoice} onBlur={handleTypeChange} options={dropdownDayTypes()} label={"Select from the options below."} />
        {renderOtherChoice()}
    </PageWrapper>
}
export default TypeOfDay