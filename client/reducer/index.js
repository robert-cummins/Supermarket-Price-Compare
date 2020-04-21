import {combineReducers} from 'redux'

function newWorldReducer(state=[], action){
    switch(action.type){
        case "GET_NEWWORLD_ITEMS":
            return action.items
        
        default:
            return state
    }
}

function countdownReducer(state=[], action){
    switch(action.type){
        case "GET_COUNTDOWN_ITEMS":
            return action.items
        
        default:
            return state
    }
}

function pakSaveReducer(state=[], action){
    switch(action.type){
        case "GET_PAKSAVE_ITEMS":
            return action.items
        
        default:
            return state
    }
}

function searchedNewWorldReducer(state=[], action){
    switch(action.type){
        case "GET_SEARCHED_NEWWORLD_ITEMS":
            return action.items
        
        default:
            return state
    }
}

function searchedCountdownReducer(state=[], action){
    switch(action.type){
        case "GET_SEARCHED_COUNTDOWN_ITEMS":
            return action.items
        
        default:
            return state
    }
}

function searchedPakSaveReducer(state=[], action){
    switch(action.type){
        case "GET_SEARCHED_PAKSAVE_ITEMS":
            return action.items
        
        default:
            return state
    }
}

const selectedItemReducer = (state = [], action) => {
    if(action.type === 'ITEM_SELECTED'){
        return [...state, action.item]
    }
    return state
}


export default combineReducers({
    newWorld: newWorldReducer,
    countdown: countdownReducer,
    pakSave: pakSaveReducer,
    searchedNewWorldItems: searchedNewWorldReducer,
    searchedCountdownItems: searchedCountdownReducer,
    serchedPakSaveItems: searchedPakSaveReducer,
    selectedItems: selectedItemReducer
})