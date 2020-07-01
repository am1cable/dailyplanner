import React, { useState, useEffect } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { CATEGORIZE_ACTIVITIES, PRIORITIZE_ACTIVITIES_TOP } from "../../pageUrls";
import { useSelector } from "react-redux";
import { List, ListItem, Card, Grid, CardContent, ListItemText, Avatar, ListItemAvatar, Button } from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline';
import { getScheduleByHours, formatTime } from "../../../utils/time";
import { prioritizedActivities, priorityWeightizedActivities, priorities } from "../../../utils/activities";
import "../../1_majorParts/majorParts/majorParts.scss";
import { exportAsPdf } from "../../../utils/pdf";
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    top3Icon: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const localStorageId = 'overview-category';
const ActvityListItem = ({ name, priority }, i) => {
    const classes = useStyles();

    return <ListItem key={i}>
        <ListItemAvatar><Avatar className={i < 3 ? classes.top3Icon : ''}>{i + 1}</Avatar></ListItemAvatar><ListItemText primary={name} secondary={priorities[priority]} /></ListItem>

}
export const Overview = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const [activitesInDay, setActivitysInDay] = useState(currentDay.activitesInDay || []);
    const [selectedScheduleItem, setSelectedScheduleItem] = useState((currentDay.majorParts.find(({ id }) => id === localStorage.getItem(localStorageId)) || {}).id || currentDay.majorParts[0].id);

    useEffect(() => { console.log(selectedScheduleItem) }, []);

    const handleScheduleClick = (id) => {
        localStorage.setItem(localStorageId, id);
        setSelectedScheduleItem(id);
    }

    const renderScheduleTimeline = (schedule, index) =>
        <ScheduleTimelineItem
            key={index}
            selected={selectedScheduleItem === schedule.id}
            onClick={handleScheduleClick} key={index}
            hasConnector={index < getScheduleByHours(currentDay).length - 1}
            {...schedule}
        />

    const generateUnformattedSchedule = () => [
        currentDay.name,
        ...getScheduleByHours(currentDay)
            .map(s => ({
                schedule: s, activities: activitesInDay.filter(a => a.categoryId === s.id)
            }))
            .map(({ schedule, activities }) => {
                return [`${formatTime(schedule)} - ${schedule.name || "Sleep"}`, ...activities.map((a, i) => `                  ${i}) ${a.name}`)];
            })
            .flat()
    ];

    return <PageWrapper className="overview" back={{ link: PRIORITIZE_ACTIVITIES_TOP }} forward={{ disabled: true, link: CATEGORIZE_ACTIVITIES }}>
        <div>Review your everything</div>
        <Grid container direction="column">
            <Grid item>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs>
                        <Timeline>
                            {getScheduleByHours(currentDay).map(renderScheduleTimeline)}
                        </Timeline>
                    </Grid>
                    <Grid item xs={8}>
                        <Card variant="outlined">
                            <CardContent>
                                <List>
                                    {activitesInDay.filter(a => a.categoryId === selectedScheduleItem).sort(prioritizedActivities).sort(priorityWeightizedActivities).map(ActvityListItem)}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid></Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={exportAsPdf(generateUnformattedSchedule)}>Export as a PDF.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default Overview