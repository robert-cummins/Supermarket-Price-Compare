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
    value: "Fresh food, bakery and chilled",
    isChecked: false
},
{
    id: 12346,
    value: "Frozen",
    isChecked: false
},
{
    id: 12347,
    value: "Pantry and non perishable",
    isChecked: false
},
{
    id: 12348,
    value: "Beer, cider and wine",
    isChecked: false
},
{
    id: 12349,
    value: "Personal care",
    isChecked: false
},
{
    id: 12350,
    value: "Baby and toddler",
    isChecked: false
},
{
    id: 12351,
    value: "Kitchen, dining and household",
    isChecked: false
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