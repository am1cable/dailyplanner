import React from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { HOURS_OF_SLEEP, START_OF_DAY } from "../../pageUrls";
import { useSelector } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import "./totalHours.scss";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { getTimes } from "../../../utils/time";

export const TotalHours = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const calculateTime = () => getTimes({ sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations });
    const calculateHours = () => calculateTime().reduce((total, { hours }) => total + parseInt(hours), 0);

    const isOverHours = () => calculateHours() > 24;
    const isUnderHours = () => calculateHours() < 24;

    const renderDisplayTotals = () => {
        return <List>
            {calculateTime().map((duration, index) =>
                <ListItem key={index}>
                    <ListItemText primary={(currentDay.majorParts.find(part => part.id === duration.id) || []).name || "Sleep"} secondary={`${duration.hours} hour${duration.hours > 1 ? 's' : ''}`} />
                </ListItem>)}
        </List>
    }
    return <PageWrapper back={{ link: HOURS_OF_SLEEP }} forward={{ disabled: isOverHours() || isUnderHours(), link: START_OF_DAY }}>
        <div><p>Your total time planned is {calculateHours()} hours.</p></div>
        {isOverHours() ? <Alert severity="error">Your total hours planned are over by {calculateHours() - 24}h.</Alert> : null}
        {isUnderHours() ? <Alert severity="warning">Your total hours planned are short by {24 - calculateHours()}h.</Alert> : null}
        <Alert icon={false} className="display-totals" severity={isOverHours() ? "error" : isUnderHours() ? "warning" : "success"}>{renderDisplayTotals()}</Alert>
    </PageWrapper>
}
export default TotalHours