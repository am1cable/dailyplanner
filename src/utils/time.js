import { generateId } from "./id";

export const hourOptionsStartOfDay = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
export const hourOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const minuteOptions = ["00", "30"];
export const dayPeriod = ["am", "pm"];

export const getTimes = ({sleep = {}, activities = []}) => {
    const sleepTime = { hours: hourOptions[sleep.hours], minutes: minuteOptions[sleep.minutes], id: generateId() };
    const activityTime = activities.map(duration => ({
        hours: hourOptions[duration.hours],
        id: duration.id
    }))
    return [...activityTime, sleepTime];
}

const calculateTime = (currentDay) => getTimes({ sleep: currentDay.hoursOfSleep, activities: currentDay.majorPartDurations });
const getStartOfDayAsHour = (currentDay) => ({
    hour: hourOptionsStartOfDay[currentDay.startOfDay.hours],
    ampm: dayPeriod[currentDay.startOfDayPeriod]
})

export const getScheduleByHours = (currentDay) => {
    const times = calculateTime(currentDay)
    return times.reduce((timeline, currentActivity, index) => {
        const part = (currentDay.majorParts.find(part => part.id === currentActivity.id) || []);
        if (timeline.length === 0) {
            timeline.push({ ...getStartOfDayAsHour(currentDay), id: currentActivity.id, name: (part.name || part.placeholder) });
        } else {
            const prevActivityStart = timeline[timeline.length - 1];
            const previousActivity = times[index - 1];
            let newActivityStartHour = parseInt(prevActivityStart.hour) + parseInt(previousActivity.hours);
            let newActivityStartampm = prevActivityStart.ampm;
            if (newActivityStartHour > 12) {
                newActivityStartHour = newActivityStartHour - 12;
                newActivityStartampm = prevActivityStart.ampm === "am" ? "pm" : "am";
            }
            
            timeline.push({ hour: newActivityStartHour, ampm: newActivityStartampm, id: currentActivity.id, name: (part.name || part.placeholder) });
        }
        return timeline;
    }, [])
}

export const formatTime = ({hour, ampm}) => `${hour}:00 ${ampm}`