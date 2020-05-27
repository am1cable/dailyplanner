const defaultState = {
    dayTypeOptions: ["Workday", "Housework / Chores", "Free", "Other"],
    dayTypeChoice: 0,
    dayTypeChoiceOther: "",
    dayTypeDetails: []

};

const pageData = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_PAGE_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default pageData