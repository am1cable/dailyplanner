import React, { useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { useSelector, useDispatch } from "react-redux";
import { saveData } from "../../actions";
import _ from "lodash";
import { Dropdown } from "../../components/dropdown/dropdown";
import TextInput from "../../components/input/textInput";
import { MAJOR_PARTS, TYPE_OF_DAY } from "../pageUrls";

export const TypeOfDay = () => {
    const pageData = useSelector(state => state.pageData);
    const dispatch = useDispatch();
    const dropdownDayTypes = () => pageData.dayTypeOptions.filter(o => o !== '');

    const handleTypeChange = value => dispatch(saveData({ ...pageData, dayTypeChoice: value }));
    const handleOtherChange = value => dispatch(saveData({ ...pageData, dayTypeChoiceOther: value }));

    const renderOtherChoice = () => <div>
        {pageData.dayTypeChoice === (pageData.dayTypeOptions.length - 1) ?
            <TextInput label={"What kind of day is it?"} text={pageData.dayTypeChoiceOther} onBlur={handleOtherChange} />
            : null}</div>

    return <PageWrapper
        forward={{ link: MAJOR_PARTS }}
        back={{ disabled: true, link: TYPE_OF_DAY}}>
        <div>What type of day do you want?</div>
        <Dropdown choice={pageData.dayTypeChoice} onBlur={handleTypeChange} options={dropdownDayTypes()} label={"Select from the options below."} />
        {renderOtherChoice()}
    </PageWrapper>
}
export default TypeOfDay