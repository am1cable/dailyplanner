import { generateId } from "./id";

export const hourOptionsStartOfDay = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
export const hourOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const minuteOptions = ["00", "30"];
export const dayPeriod = ["am", "pm"];

export const getTimes = ({sleep = {}, activities = []}) => {
    const sleepTime = { hours: hourOptions[sleep.hours], minutes: minuteOptions[sleep.minutes], id: generateId() };
    const activityTime = activities.map(duration => ({
        hours: hourOptions[duration.hours],
        minutes: minuteOptions[duration.minutes],
        id: duration.id
    }))
    return [...activityTime, sleepTime];
}

const calculateTime = (currentDay) => getTimes({ sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations });
const getStartOfDayAsHourMinute = (currentDay) => ({
    hour: hourOptionsStartOfDay[currentDay.startOfDay.hours],
    minutes: minuteOptions[currentDay.startOfDay.minutes],
    ampm: dayPeriod[currentDay.startOfDayPeriod]
})

export const getScheduleByHours = (currentDay) => {
    const times = calculateTime(currentDay)
    return times.reduce((timeline, currentActivity, index) => {
        const name = (currentDay.majorParts.find(part => part.id === currentActivity.id) || []).name;
        if (timeline.length === 0) {
            timeline.push({ ...getStartOfDayAsHourMinute(currentDay), id: currentActivity.id, name: name });
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

export const formatTime = ({hour, minutes, ampm}) => `${hour}:${(minutes.toString().length === 1 ? `${minutes}0` : minutes)} ${ampm}`