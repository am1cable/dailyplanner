const defaultState = {};

const currentDayData = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_DAY_DATA':
            return {
                ...action.data
            }
        case 'UPDATE_CURRENT_DAY_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'DELETE_ALL_DATA':
            return defaultState;
        default:
            return state
    }
}

export default currentDayData