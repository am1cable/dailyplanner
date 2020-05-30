import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { TYPE_OF_DAY, MAJOR_PARTS_DURATION } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../../components/input/textInput";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, List, ListItem } from "@material-ui/core";
import { saveDay } from "../../actions";
import debounce from 'lodash/debounce';
import "./majorParts.scss";
import { generateId } from "../../utils/id";

export const MajorParts = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const [majorParts, setMajorParts] = useState(currentDay.majorParts || []);
    const dispatchSaveDay = () => dispatch(saveDay({ ...currentDay, majorParts }))
    const saveDayDebounce = useCallback(debounce(dispatchSaveDay, 1000, { leading: true, trailing: true }));
    const newPartInput = useRef();

    // useEffect(() => saveDayDebounce, [])
    useEffect(() => { saveDayDebounce(); }, [majorParts])

    const createNewMajorPart = value => {
        setMajorParts([...majorParts, { name: value, id: generateId() }]);
        setTimeout(() => { newPartInput.current && newPartInput.current.focus(); }, 50);
    }
    const updateMajorPart = index => value => {
        const newMajorParts = [...majorParts];
        const oldMajorParts = newMajorParts.splice(index, 1);
        newMajorParts.splice(index, 0, { name: value, id: oldMajorParts[0].id });
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

    const renderCurrentMajorParts = () => majorParts.map((part, index) => <ListItem className="part" key={index}><TextInput label={index + 1} text={part.name} onChange={updateMajorPart(index)} /> {renderDeleteButton(index)} </ListItem>);

    return <PageWrapper className="major-parts" back={{ link: TYPE_OF_DAY }} forward={{ disabled: !currentDay.majorParts || currentDay.majorParts.length === 0, link: MAJOR_PARTS_DURATION }}>
        <div>What are the major parts of this day? Maximum 7.</div>
        <List>{renderCurrentMajorParts()}
        {majorParts.length < 7 && <ListItem> <TextInput forwardedRef={newPartInput} autoFocus text="" label={majorParts.length + 1} clearInput onBlur={createNewMajorPart} /></ListItem>}
        </List>
    </PageWrapper>
}
export default MajorParts