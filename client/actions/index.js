import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'

export const getNewWorldItems = (items) => {
    return {
        type: "GET_NEWWORLD_ITEMS",
        items
    }
}

export const getCountdownItems = (items) => {
    return {
        type: "GET_COUNTDOWN_ITEMS",
        items
    }
}

export const getPakSaveItems = (items) => {
    return {
        type: "GET_PAKSAVE_ITEMS",
        items
    }
}

export const getSearchedNewWorldItems = (items) => {
    return {
        type: "GET_SEARCHED_NEWWORLD_ITEMS",
        items
    }
}

export const getSearchedCountdownItems = (items) => {
    return {
        type: "GET_SEARCHED_COUNTDOWN_ITEMS",
        items
    }
}

export const getSearchedPakSaveItems = (items) => {
    return {
        type: "GET_SEARCHED_PAKSAVE_ITEMS",
        items
    }
}

export const getSelectedItems = (item, num) => {
    item.numOf = num
    return {
        type: 'ITEM_SELECTED',
        item
    }
}

export const editSelectedItems = (name, num) => {
    if(num === undefined){num = '1'}
    return {
        type: 'EDIT_SELECTED_ITEM',
        name,
        num
    }
}

export const removeSelectedItem = (name) => {
    return {
        type: 'REMOVE_SELECTED_ITEM',
        name
    }
}

export const changeCategorys = (name) => {
    return {
        type: 'CHANGE_CHECK',
        name
    }
}

export const checkAll = () => {
    return {
        type: 'CHECK_ALL'
    }
}

export const checkNone = () => {
    return {
        type: 'CHECK_NONE'
    }
}



export function fetchNewWorldData() {
    return dispatch => {
        return getNewWorldData()
            .then(items => {
                return dispatch(getNewWorldItems(items))
            })
    }
}

export function fetchCountdownData() {
    return dispatch => {
        return getCountdownData()
            .then(items => {
                return dispatch(getCountdownItems(items))
            })
    }
}

export function fetchPakSaveData() {
    return dispatch => {
        return getPakSaveData()
            .then(items => {
                return dispatch(getPakSaveItems(items))
            })
    }
}

