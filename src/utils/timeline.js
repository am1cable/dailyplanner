import { hourOptions, minuteOptions } from "../components/input/dropdown/hourMinuteInput";
import { generateId } from "./id";

export const getTimes = ({sleep = {}, activities = []}) => {
    const sleepTime = { hours: hourOptions[sleep.hours], minutes: minuteOptions[sleep.minutes], id: generateId() };
    const activityTime = activities.map(duration => ({
        hours: hourOptions[duration.hours],
        minutes: minuteOptions[duration.minutes],
        id: duration.id
    }))
    return [...activityTime, sleepTime];
}