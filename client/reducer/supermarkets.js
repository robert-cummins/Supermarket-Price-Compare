export function newWorldReducer(state = [], action) {
    switch (action.type) {
        case "GET_NEWWORLD_ITEMS":
            return action.items.map(item => {
                if (item.type == 'kg') { item.type = '/ kg' }
                else { item.type = "Each" }
                return item
            })

        default:
            return state
    }
}

export function countdownReducer(state = [], action) {
    switch (action.type) {
        case "GET_COUNTDOWN_ITEMS":
            return action.items.map(item => {
                if (item.type == 'kg') { item.type = '/ kg' }
                else { item.type = "Each" }
                return item
            })

        default:
            return state
    }
}

export function pakSaveReducer(state = [], action) {
    switch (action.type) {
        case "GET_PAKSAVE_ITEMS":
            return action.items.map(item => {
                if (item.type == 'kg') { item.type = '/ kg' }
                else { item.type = "Each" }
                return item
            })

        default:
            return state
    }
}