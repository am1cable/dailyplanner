import React, { useState, useEffect, useMemo } from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import isEqual from "lodash/isEqual";
import HourInput from "../../../components/input/dropdown/hourMinuteInput";

export const HoursOfSleepInput = ({ currentDay, templateDay, saveDay }) => {
    const [hoursOfSleep, setHoursOfSleep] = useState(currentDay.hoursOfSleep || templateDay.hoursOfSleep || { hours: 0, minutes: 0 });

    useEffect(() => {
        if (!isEqual(hoursOfSleep, currentDay.hoursOfSleep)) saveDay({ ...currentDay, hoursOfSleep });
    }, [hoursOfSleep])

    return <HourInput {...hoursOfSleep} onBlur={setHoursOfSleep} />
}

export const HoursOfSleep = ({ currentDay, templateDay, saveDay }) => {
    const isMissingHours = useMemo(() => !currentDay.hoursOfSleep || currentDay.hoursOfSleep.hours === "", [currentDay]);

    return <PageWrapper forward={{ disabled: isMissingHours }}>
        <div> <p>How many hours do you want to sleep?</p><HoursOfSleepInput {...{ currentDay, templateDay, saveDay }} /></div>
    </PageWrapper>
}
export default HoursOfSleep