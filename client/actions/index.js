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


export function fetchNewWorldData() {
    return dispatch => {
        return getNewWorldData()
            .then(items => {
                console.log(items)
                return dispatch(getNewWorldItems(items))
            })
    }
}

export function fetchCountdownData() {
    return dispatch => {
        return getCountdownData()
            .then(items => {
                console.log(items)
                return dispatch(getCountdownItems(items))
            })
    }
}

export function fetchPakSaveData() {
    return dispatch => {
        return getPakSaveData()
            .then(items => {
                console.log(items)
                return dispatch(getPakSaveItems(items))
            })
    }
}

