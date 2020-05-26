export const selectedItemReducer = (state = [], action) => {
    switch (action.type) {
        case "ITEM_SELECTED":
            
            return [...state, action.item]
    
        case "EDIT_SELECTED_ITEM":
            return state.map(item => {
                if(item.name === action.name && item.price === action.price){
                    item.numOf = action.num
                }
                return item
            })
        
        case "REMOVE_SELECTED_ITEM":
            return state.filter(item => {
                item.selected = false
                if(item.name === action.name && item.price === action.price){
                    return false
                }
                return true
            })
    
        default:
            return state
    }
}