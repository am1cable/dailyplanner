import React, { useState, useMemo, useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { START_OF_DAY } from "../pageUrls";
import { useSelector, useDispatch } from "react-redux";
import { hourOptions as hourOptionsStartOfDay, dayPeriod } from "../startOfDay/startOfDay";
import { minuteOptions } from "../../components/input/dropdown/hourMinuteInput";
import { getTimes } from "../../utils/timeline";
import jsPDF from 'jspdf';
import { Button, Grid } from "@material-ui/core";

export const StartTimes = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const calculateTime = () => getTimes({ sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations });
    const getStartOfDayAsHourMinute = () => ({
        hour: hourOptionsStartOfDay[currentDay.startOfDay.hours],
        minutes: minuteOptions[currentDay.startOfDay.minutes],
        ampm: dayPeriod[currentDay.startOfDayPeriod]
    })
    const getScheduleByHours = () => {
        const times = calculateTime()
        return times.reduce((timeline, currentActivity, index) => {
            const name = (currentDay.majorParts.find(part => part.id === currentActivity.id) || []).name;
            if (timeline.length === 0) {
                timeline.push({ ...getStartOfDayAsHourMinute(), id: currentActivity.id, name: name });
            } else {
                const prevActivityStart = timeline[timeline.length - 1];
                const previousActivity = times[index - 1];
                const newActivityStartMinutes = parseInt(prevActivityStart.minutes) + parseInt(previousActivity.minutes);
                let newActivityStartHour = parseInt(prevActivityStart.hour) + parseInt(previousActivity.hours);
                let newActivityStartampm = prevActivityStart.ampm;
                if (newActivityStartHour > 12) {
                    newActivityStartHour = newActivityStartHour - 12;
                    newActivityStartampm = prevActivityStart.ampm === "am" ? "pm" : "am";
                }
                if (newActivityStartMinutes > 30) {
                    newActivityStartHour++;
                    timeline.push({ hour: newActivityStartHour, minutes: "00", ampm: newActivityStartampm, id: currentActivity.id, name: name });
                } else {
                    timeline.push({ hour: newActivityStartHour, minutes: newActivityStartMinutes, ampm: newActivityStartampm, id: currentActivity.id, name: name });
                }
            }
            return timeline;
        }, [])
    }

    const exportAsPdf = (text) => () => {
        const fonts = ["helvetica", "neue"];
        const unit = "in";
        const pageWidth = 8.5;
        const lineHeight = 1.2;
        const margin = 0.5;
        const maxLineWidth = pageWidth - margin * 2;
        const fontSize = 24;
        const ptsPerInch = 72;
        const oneLineHeight = (fontSize * lineHeight) / ptsPerInch;

        const doc = new jsPDF({
            unit: unit,
            lineHeight: lineHeight
        }).setProperties({ title: "thingey" });
        const textLines = doc
            .setFont(...fonts)
            .setFontSize(fontSize)
            .splitTextToSize(text(), maxLineWidth);
        doc.text(textLines, margin, margin + 2 * oneLineHeight);
        const today = new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' });
        doc.save(`My Daily Planner-${today}`);
    }

    const generateUnformattedSchedule = () => getScheduleByHours().map(time => `${time.hour}:${time.minutes} ${time.ampm} - ${time.name || "Sleep"}\n`).reduce((finalText, text) => finalText + text, "")
    const renderScheduleByHours = () => getScheduleByHours().map((time, index) => <div key={index}>{time.hour}:{time.minutes} {time.ampm} - {time.name || "Sleep"} </div>)

    return <PageWrapper back={{ link: START_OF_DAY }}>
        <Grid container spacing={3} 
            direction="column">
            <Grid item>
                {renderScheduleByHours()}
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={exportAsPdf(generateUnformattedSchedule)}>Export as a PDF.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default StartTimes 