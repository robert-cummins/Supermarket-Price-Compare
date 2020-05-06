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

const categoryReducer = (state = [{
    id: 12345,
    value: "Fresh food, chilled and bakery",
    isChecked: true
},
{
    id: 12346,
    value: "Frozen",
    isChecked: true
},
{
    id: 12347,
    value: "Pantry and non perishables",
    isChecked: true
},
{
    id: 12348,
    value: "Beer, cider and wine",
    isChecked: true
},
{
    id: 12349,
    value: "Personal Care",
    isChecked: true
},
{
    id: 12350,
    value: "Baby toddler",
    isChecked: true
},
{
    id: 12351,
    value: "Kitchen, dining and household",
    isChecked: true
}], action) => {
    
    switch(action.type){
        case "CHANGE_CHECK":
            return state.map(category => {
                if(category.value == action.name && category.isChecked == false){
                    category.isChecked = true
                    return category
                } 
                else if (category.value == action.name && category.isChecked == true) {
                    category.isChecked = false
                    return category
                } else {
                    return category
                }
            })
        
        default:
            return state
    }
}


export default combineReducers({
    newWorld: newWorldReducer,
    countdown: countdownReducer,
    pakSave: pakSaveReducer,
    searchedNewWorldItems: searchedNewWorldReducer,
    searchedCountdownItems: searchedCountdownReducer,
    serchedPakSaveItems: searchedPakSaveReducer,
    selectedItems: selectedItemReducer,
    categorys: categoryReducer
})