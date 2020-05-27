import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { MAJOR_PARTS } from "../pageUrls";
import HourMinuteInput from "../../components/input/dropdown/hourMinuteInput";
import "./majorParts.scss";

export const MajorPartsDuration = () => {
    const currentDay = useSelector(state => state.currentDayData);
    useEffect(() => {
        console.log(currentDay);
    }, [currentDay])

    return <PageWrapper className="major-parts major-parts-duration" back={{link: MAJOR_PARTS}}>
        <div>How long would you like to spend on each part of your day?</div>
        {currentDay.majorParts && currentDay.majorParts.map((part, index) => <div className="part" key={index}><p>{part}</p> <HourMinuteInput/></div>)}
    </PageWrapper>
}
export default MajorPartsDuration