export const saveAll = data => ({
    type: 'UPDATE_PAGE_DATA',
    data
})

export const deleteAll = () => ({
    type: 'DELETE_ALL_DATA'
})

export const saveDay = data => ({
    type: 'UPDATE_CURRENT_DAY_DATA',
    data
})

export const setDay = data => ({
    type: 'SET_CURRENT_DAY_DATA',
    data
})