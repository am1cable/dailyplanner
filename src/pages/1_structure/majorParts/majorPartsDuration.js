import React, { useEffect, useState, useMemo } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";
import "./majorParts.scss";
import isEqual from "lodash/isEqual";
import { List, ListItem, ListItemText } from "@material-ui/core";

export const updateMajorPartDurations = (majorPartDurations, index, callback) => ({ ...props }) => {
    const newMajorPartDurations = [...majorPartDurations];
    const oldMajorPartDurations = newMajorPartDurations.splice(index, 1);
    newMajorPartDurations.splice(index, 0, { id: oldMajorPartDurations[0].id, ...props })
    callback(newMajorPartDurations);
}

export const MajorPartsDuration = ({currentDay, templateDay, saveDay}) => {
    const getDurations = () => (currentDay.majorParts).map(part => ((currentDay.majorPartDurations || templateDay.majorPartDurations || []).find(duration => duration.id === part.id) || { id: part.id, hours: 0, minutes: 0 }));
    const [majorPartDurations, setMajorPartDurations] = useState(getDurations());
    const hasHours = useMemo(() => majorPartDurations.every(duration => (duration.hours !== 0)), [majorPartDurations]);

    useEffect(() => {
        if (!isEqual(majorPartDurations, currentDay.majorPartDurations)) saveDay({ ...currentDay, majorPartDurations });
    }, [majorPartDurations])

    const renderNames = () => currentDay.majorParts.map((part, index) => <ListItem key={index}><ListItemText>{part.name}</ListItemText></ListItem>)
    const renderDurations = () => currentDay.majorPartDurations.map((duration, index) => <ListItem key={index}><HourInput {...duration} onBlur={updateMajorPartDurations(currentDay.majorPartDurations, index, setMajorPartDurations)} /></ListItem>)

    return <PageWrapper className="major-parts major-parts-duration" forward={{ disabled: !hasHours }}>
        <div>How long would you like to spend on each part of your day?</div>
        <div className="parts-lists">
            <List className="names">{currentDay.majorParts && renderNames()}</List>
            <List className="durations">{currentDay.majorPartDurations && renderDurations()}</List>
        </div>
    </PageWrapper>
}
export default MajorPartsDuration