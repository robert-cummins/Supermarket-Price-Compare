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

export const fetchCountdownData= () => async (dispatch) => {
    await axios.get('/api/v1/scraper/countdown')
    .then(items => {
        return dispatch(getCountdownItems(items.data))
    })
}

export const fetchPakSaveData = () => async (dispatch) => {
    await axios.get('/api/v1/scraper/pakandsave')
    .then(items => {
        return dispatch(getPakSaveItems(items.data))
    })
}

