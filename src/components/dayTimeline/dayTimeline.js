import React from "react";
import { Typography } from "@material-ui/core";
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@material-ui/lab";
import { formatTime } from "../../utils/time";
import { makeStyles } from '@material-ui/core/styles';
import "./dayTimeline.scss";

const useStyles = makeStyles((theme) => ({
    dot: {
        padding: "10px"
    }
}));

export const ScheduleTimelineItem = ({ onClick, id, name = "Sleep", hour, minutes, ampm, hasConnector = false, selected }) => {
    const classes = useStyles();
    const isSleep = () => name === "Sleep";
    const handleOnClick = () => {
        canClick() && onClick(id)
    }
    const canClick = () => !isSleep() && !!onClick;
    return <TimelineItem className="day-timeline-item">
        <TimelineSeparator>
            <TimelineDot color={selected ? "primary" : undefined}
                variant={(canClick() || !isSleep()) ? "default" : "outlined"}
                className={classes.dot}
                style={{ cursor: canClick() ? "pointer" : "default" }}
                onClick={handleOnClick} />
            {hasConnector && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent
            style={{ cursor: canClick() ? "pointer" : "default" }}
            onClick={handleOnClick}>
            <Typography>
                {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {formatTime({ hour, minutes, ampm })}
            </Typography>
        </TimelineContent>
    </TimelineItem>
}