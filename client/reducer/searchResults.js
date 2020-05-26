export function searchedNewWorldReducer(state = [], action) {
    switch (action.type) {
        case "GET_SEARCHED_NEWWORLD_ITEMS":
            return action.items

        default:
            return state
    }
}

export function searchedCountdownReducer(state = [], action) {
    switch (action.type) {
        case "GET_SEARCHED_COUNTDOWN_ITEMS":
            return action.items

        default:
            return state
    }
}

export function searchedPakSaveReducer(state = [], action) {
    switch (action.type) {
        case "GET_SEARCHED_PAKSAVE_ITEMS":
            return action.items

        default:
            return state
    }
}