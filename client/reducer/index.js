import {combineReducers} from 'redux'

function newWorldReducer(state=[], action){
    switch(action.type){
        case "GET_NEWWORLD_ITEMS":
            return action.items
        
        default:
            return state
    }
}

export default combineReducers({
    newWorld: newWorldReducer
})