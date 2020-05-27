import { combineReducers } from 'redux'
import pageData from './pageData'
import currentDayData from './currentDayData';

export default combineReducers({
    pageData,
    currentDayData
});
