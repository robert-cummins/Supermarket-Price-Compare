import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'

export const getNewWorldItems = (items) => {
    return {
        type: "GET_NEWWORLD_ITEMS",
        items
    }
}

export function fetchNewWorldData(){
    return dispatch => {
        return getNewWorldData()
        .then(items => {
            console.log(items)
            return dispatch(getNewWorldItems(items))
        })
    }
}

