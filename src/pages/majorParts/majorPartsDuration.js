import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { MAJOR_PARTS, HOURS_OF_SLEEP } from "../pageUrls";
import HourMinuteInput from "../../components/input/dropdown/hourMinuteInput";
import "./majorParts.scss";
import { saveDay } from "../../actions";
import isEqual from "lodash/isEqual";

export const MajorPartsDuration = () => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const getDurations = () =>  currentDay.majorPartDurations || (currentDay.majorParts || []).map(part => ({ hours: "", minutes: "" }));
    const [majorPartDurations, setMajorPartDurations] = useState(getDurations());
    const hasHours = useMemo(() => majorPartDurations.every(duration => duration.hours !== "" && duration.minutes !== ""), [majorPartDurations]);

    useEffect(() => {
        if (!isEqual(majorPartDurations, currentDay.majorPartDurations)) dispatch(saveDay({ ...currentDay, majorPartDurations }));
    }, [majorPartDurations])

    const updateMajorPartDurations = (index) => ({ ...props }) => {
        const newMajorPartDurations = [...majorPartDurations];
        newMajorPartDurations.splice(index, 1, props)
        setMajorPartDurations(newMajorPartDurations);
    }

    const renderDurations = () => currentDay.majorParts.map((part, index) => <div className="part" key={index}>
        <p>{part}</p>
        <HourMinuteInput {...majorPartDurations[index]} onBlur={updateMajorPartDurations(index)} />
    </div>)

    return <PageWrapper className="major-parts major-parts-duration" back={{ link: MAJOR_PARTS }} forward={{link: HOURS_OF_SLEEP, disabled: !hasHours}}>
        <div>How long would you like to spend on each part of your day?</div>
        {currentDay.majorParts && renderDurations()}
    </PageWrapper>
}
export default MajorPartsDuration