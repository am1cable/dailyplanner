import React, { useState, useEffect, useMemo } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import isEqual from "lodash/isEqual";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";

export const HoursOfSleepInput = ({ currentDay, templateDay, saveDay }) => {
    const [hoursOfSleep, setHoursOfSleep] = useState(currentDay.hoursOfSleep || { hours: 0, minutes: 0 });

    useEffect(() => {
        if (!isEqual(hoursOfSleep, currentDay.hoursOfSleep)) saveDay({ ...currentDay, hoursOfSleep });
    }, [hoursOfSleep])

    return <HourInput {...hoursOfSleep} onBlur={setHoursOfSleep} />
}

export const HoursOfSleep = ({ currentDay, saveDay }) => {
    const [hoursOfSleep, setHoursOfSleep] = useState(currentDay.hoursOfSleep || { hours: 0, minutes: 0 });
    const isMissingHours = useMemo(() => hoursOfSleep.hours === "", [hoursOfSleep]);

    useEffect(() => {
        if (!isEqual(hoursOfSleep, currentDay.hoursOfSleep)) saveDay({ ...currentDay, hoursOfSleep });
    }, [hoursOfSleep])

    return <PageWrapper forward={{ disabled: isMissingHours }}>
        <div> <p>How many hours do you want to sleep?</p><HoursOfSleepInput {...{ currentDay, saveDay }} /></div>
    </PageWrapper>
}
export default HoursOfSleep