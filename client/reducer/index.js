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

export default combineReducers({
    newWorld: newWorldReducer,
    countdown: countdownReducer,
    pakSave: pakSaveReducer
})