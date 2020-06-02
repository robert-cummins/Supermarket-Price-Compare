import { getNewWorldData, getCountdownData, getPakSaveData } from '../api/superMarkets'
import axios from 'axios'

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

export const fetchNewWorldData = () => async (dispatch) => {
        await axios.get('/api/v1/scraper/newworld')
        .then(items => {
            return dispatch(getNewWorldItems(items.data))
        })
}

export function fetchCountdownData() {
    return dispatch => {
        axios.get('/api/v1/scraper/countdown')
        .then(items => {
            return dispatch(getCountdownItems(items.data))
        })
    }
}

export function fetchPakSaveData() {
    return dispatch => {
        axios.get('/api/v1/scraper/pakandsave')
        .then(items => {
            return dispatch(getPakSaveItems(items.data))
        })
    }
}