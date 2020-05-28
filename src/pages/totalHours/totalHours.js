import React, { useMemo } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { HOURS_OF_SLEEP, START_OF_DAY } from "../pageUrls";
import { useSelector } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import "./totalHours.scss";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { getTimes } from "../../utils/timeline";

export const TotalHours = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const calculateTime = () => getTimes({sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations});
    const isOverHours = () => calculateTotals > 24;
    const isUnderHours = () => calculateTotals < 24;

    const calculateTotals = useMemo(() => {
        return calculateTime().reduce((totalValue, activity) => {
            totalValue += parseFloat(activity.hours);
            if (activity.minutes === "30") totalValue += 0.5;
            return totalValue;
        }, 0)
    }, [currentDay]);

    const calculateHours = () => calculateTime().reduce((total, activity) => {
        const newHours = {hours : total.hours + parseInt(activity.hours), minutes: total.minutes + parseInt(activity.minutes)};
        if (newHours.minutes === 60) {
            newHours.hours ++;
            newHours.minutes = 0;
        }
        return newHours;
    }, {hours: 0, minutes: 0})

    const renderDecimalAsHourMinutes = (number) => {
        if (number < 1) return `30 minutes`;
        else if (number % 1 != 0) {
            const hour = number.toString().match(/^\d*/);
            return `${hour} hour${hour !== 1 ? 's' : ''} and 30 minutes`;
        }
        return `${number} hour${number !== 1 ? 's' : ''}`
    }

    const renderDisplayTotals = () => {
        return <List>
            {calculateTime().map((duration, index) => <ListItem key={index}><ListItemText primary={currentDay.majorParts[index] || "Sleep"} secondary={`${duration.hours} hour${duration.hours > 1 ? 's':''}${duration.minutes === "30"? `, ${duration.minutes} minutes` : ''}`}/></ListItem>)}
        </List>
    }
    return <PageWrapper back={{ link: HOURS_OF_SLEEP }} forward={{disabled: isOverHours() || isUnderHours(), link: START_OF_DAY}}>
        <div><p>Your total time planned is {calculateHours().hours} hours{calculateHours().minutes !== 0 ? ` and ${calculateHours().minutes} minutes` : ""}.</p></div>
        {isOverHours() ? <Alert severity="error">Your total hours planned are over by {renderDecimalAsHourMinutes(calculateTotals - 24)}.</Alert> : null}
        {isUnderHours() ? <Alert severity="warning">Your total hours planned are short by {renderDecimalAsHourMinutes(24 - calculateTotals)}.</Alert> : null}
        <Alert icon={false} className="display-totals" severity={isOverHours() ? "error" : isUnderHours() ? "warning" : "success"}>{renderDisplayTotals()}</Alert>
    </PageWrapper>
}
export default TotalHours