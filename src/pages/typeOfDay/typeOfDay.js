import React, { useEffect } from "react";
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

    const handleTypeChange = value => {
        updateAllTypes({ ...pageData, dayTypeChoice: value });
    }
    const handleOtherChange = value => {
        const newDayTypeOptions = [...pageData.dayTypeOptions];
        newDayTypeOptions.splice(pageData.dayTypeOptions.length - 1, 0, value);
        updateAllTypes({ ...pageData, dayTypeOptions: newDayTypeOptions, dayTypeChoice: newDayTypeOptions.length - 2 });
    };

    const updateAllTypes = (props) => {
        if (props.dayTypeChoice !== "") {
            dispatch(saveAll({ ...props, dayTypeDetails: [...props.dayTypeDetails.filter(details => details.type !== currentDay.type), currentDay] }));
            dispatch(setDay(props.dayTypeDetails.find(detail => detail.type === props.dayTypeChoice) || { type: props.dayTypeChoice }));
        }
    }

    const renderOtherChoice = () => <div>
        {pageData.dayTypeChoice === (pageData.dayTypeOptions.length - 1) ?
            <TextInput label={"What kind of day is it?"} onBlur={handleOtherChange} />
            : null}</div>

    return <PageWrapper
        forward={{ link: MAJOR_PARTS, disabled: currentDay.type === undefined }}>
        <div>What type of day do you want?</div>
        <Dropdown choice={pageData.dayTypeChoice} onChange={handleTypeChange} options={pageData.dayTypeOptions} label={"Select from the options below."} />
        {renderOtherChoice()}
    </PageWrapper>
}
export default TypeOfDay