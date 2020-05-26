export const tabReducer = (state =[{activeTab: 'instructions'}], action) => {
    switch(action.type){
        case "SEARCH_RESULTS_TAB":
            return {activeTab: 'search'}
        
        case "SHOPPPING_BASKET_TAB":
            return {activeTab: 'shopping'}


        case "INSTRUCTIONS_TAB":
            return {activeTab: 'instructions'}

        
        default:
            return state
    }
}