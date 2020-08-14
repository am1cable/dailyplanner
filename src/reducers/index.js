import { combineReducers } from 'redux'
import pageData from './pageData'
import currentDayData from './currentDayData';
import currentStepData from './currentStepData';

export default combineReducers({
    pageData,
    currentDayData,
    currentStepData
});
