import React from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";
import Alert from '@material-ui/lab/Alert';
import "./totalHours.scss";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { getTimes } from "../../../utils/time";
import { HoursOfSleepInput } from "../hoursOfSleep/hoursOfSleep";
import { updateMajorPartDurations } from "../majorParts/majorPartsDuration";
import { isEqual } from "lodash";

export const TotalHours = ({ currentDay, saveDay }) => {
    const calculateTime = () => getTimes({ sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations });
    const calculateHours = () => calculateTime().reduce((total, { hours }) => total + parseInt(hours), 0);

    const isOverHours = () => calculateHours() > 24;
    const isUnderHours = () => calculateHours() < 24;

    const sleepTitle = "Sleep";
    const getTitle = (duration) => {
        const part = (currentDay.majorParts.find(part => part.id === duration.id) || []);
        return part.name || part.placeholder || sleepTitle;
    }
    const isSleep = (duration) => getTitle(duration) === sleepTitle;

    const renderDisplayTotals = () => <List>
        {calculateTime().map((duration, index) =>
            <ListItem key={index}>
                <ListItemText primary={getTitle(duration)} secondary={`${duration.hours} hour${duration.hours > 1 ? 's' : ''}`} />
            </ListItem>)}
    </List>


    const renderDisplayTotalsEditable = () => <List>
        {calculateTime().map((duration, index) =>
            <ListItem key={index}>
                <ListItemText primary={getTitle(duration)} secondary={renderHourDropdown(isSleep(duration), index)} />
            </ListItem>)}
    </List>

    const handleUpdateMajorPartDurations = (newMajorPartDurations) => {
        if (!isEqual(currentDay.majorPartDurations, newMajorPartDurations)){
            saveDay({...currentDay, majorPartDurations: newMajorPartDurations})
        }
    }

    const renderHourDropdown = (isSleep, index) => {
        if (isSleep){
            return <HoursOfSleepInput {...{ currentDay, saveDay }}/>
        }
        else{
            return <HourInput onBlur={updateMajorPartDurations(currentDay.majorPartDurations, index, handleUpdateMajorPartDurations)} {...currentDay.majorPartDurations[index]} />
        }
    }
    return <PageWrapper forward={{ disabled: isOverHours() || isUnderHours() }}>
        <div><p>Your total time planned is {calculateHours()} hours.</p></div>
        {isOverHours() ? <Alert severity="error">Your total hours planned are over by {calculateHours() - 24}h.</Alert> : null}
        {isUnderHours() ? <Alert severity="warning">Your total hours planned are short by {24 - calculateHours()}h.</Alert> : null}
        <Alert icon={false} className="display-totals" severity={isOverHours() ? "error" : isUnderHours() ? "warning" : "success"}>
            {(!isOverHours() && !isUnderHours()) ? renderDisplayTotals() : renderDisplayTotalsEditable()}</Alert>
    </PageWrapper>
}
export default TotalHours