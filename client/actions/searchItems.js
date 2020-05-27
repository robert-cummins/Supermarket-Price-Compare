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