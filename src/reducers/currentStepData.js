const defaultState = 1;

const currentStepData = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_STEP':
            return action.data;
        case 'DELETE_ALL_DATA':
            return defaultState;
        default:
            return state;
    }
}

export default currentStepData