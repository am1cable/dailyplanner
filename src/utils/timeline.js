import { hourOptions, minuteOptions } from "../components/input/dropdown/hourMinuteInput";

export const getTimes = ({sleep = {}, activities = []}) => {
    const sleepTime = { hours: hourOptions[sleep.hours], minutes: minuteOptions[sleep.minutes] };
    const activityTime = activities.map(duration => ({
        hours: hourOptions[duration.hours],
        minutes: minuteOptions[duration.minutes]
    }))
    return [...activityTime, sleepTime];
}