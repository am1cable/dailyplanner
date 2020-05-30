import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { MAJOR_PARTS, HOURS_OF_SLEEP } from "../pageUrls";
import HourMinuteInput from "../../components/input/dropdown/hourMinuteInput";
import "./majorParts.scss";
import { saveDay } from "../../actions";
import isEqual from "lodash/isEqual";
import { List, ListItem, ListItemText } from "@material-ui/core";

export const MajorPartsDuration = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const getDurations = () => (currentDay.majorParts || []).map(part => ((currentDay.majorPartDurations || []).find(duration => duration.id === part.id) || { id: part.id, hours: 0, minutes: 0 }));
    const [majorPartDurations, setMajorPartDurations] = useState(getDurations());
    const hasHours = useMemo(() => majorPartDurations.every(duration => (duration.hours !== 0 || duration.hours === 0 && duration.minutes !== 0)), [majorPartDurations]);

    useEffect(() => {
        if (!isEqual(majorPartDurations, currentDay.majorPartDurations)) dispatch(saveDay({ ...currentDay, majorPartDurations }));
    }, [majorPartDurations])

    const updateMajorPartDurations = (index) => ({ ...props }) => {
        const newMajorPartDurations = [...majorPartDurations];
        const oldMajorPartDurations = newMajorPartDurations.splice(index, 1);
        newMajorPartDurations.splice(index, 0, { id: oldMajorPartDurations[0].id, ...props })
        setMajorPartDurations(newMajorPartDurations);
    }

    const renderDurations = () => currentDay.majorParts.map((part, index) => <ListItem button className="part" key={index}>
        <ListItemText primary={part.name}/>
        <HourMinuteInput {...majorPartDurations.find(duration => duration.id === part.id)} onBlur={updateMajorPartDurations(index)} />
    </ListItem>)

    return <PageWrapper className="major-parts major-parts-duration" back={{ link: MAJOR_PARTS }} forward={{ link: HOURS_OF_SLEEP, disabled: !hasHours }}>
        <div>How long would you like to spend on each part of your day?</div>
        <List>        {currentDay.majorParts && renderDurations()}
        </List>
    </PageWrapper>
}
export default MajorPartsDuration