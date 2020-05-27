import React, { useState, useEffect, useMemo } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { TYPE_OF_DAY, MAJOR_PARTS_DURATION } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../components/input/textInput";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";
import { saveDay } from "../../actions";
import "./majorParts.scss";

export const MajorParts = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [majorParts, setMajorParts] = useState(currentDay.majorParts || []);

    useEffect(() => {
        dispatch(saveDay({ ...currentDay, majorParts }))
    }, [majorParts])

    const createNewMajorPart = value => {
        setMajorParts([...majorParts, value]);
    }
    const updateMajorPart = index => value => {
        const newMajorParts = [...majorParts];
        newMajorParts.splice(index, 1, value);
        setMajorParts([...newMajorParts]);
    }
    const removePart = index => () => {
        const newMajorParts = [...majorParts];
        newMajorParts.splice(index, 1);
        setMajorParts([...newMajorParts]);
    }
    const renderDeleteButton = (index) => <IconButton onClick={removePart(index)} aria-label="delete">
        <DeleteIcon fontSize="small" />
    </IconButton>

    const renderCurrentMajorParts = () => majorParts.map((part, index) => <div className="part" key={index}><TextInput text={part} onBlur={updateMajorPart(index)} /> {renderDeleteButton(index)} </div>);

    return <PageWrapper className="major-parts" back={{ link: TYPE_OF_DAY }} forward={{ disabled: !currentDay.majorParts || currentDay.majorParts.length === 0, link: MAJOR_PARTS_DURATION }}>
        <div>What are the major parts of this day? Maximum 7.</div>
        {renderCurrentMajorParts()}
        {majorParts.length < 7 && <div> <TextInput text="" clearInput onBlur={createNewMajorPart} /></div>}
    </PageWrapper>
}
export default MajorParts