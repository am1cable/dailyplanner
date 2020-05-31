const defaultState = {
    dayTypeOptions: ["Workday", "Housework / Chores", "Free", "Other"],
    dayTypeChoice: "",
    dayTypeDetails: []

};

const pageData = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_PAGE_DATA':
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

export default pageData