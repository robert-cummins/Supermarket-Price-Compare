import { combineReducers } from 'redux'
import {newWorldReducer, countdownReducer, pakSaveReducer} from './supermarkets'
import {searchedCountdownReducer, searchedNewWorldReducer, searchedPakSaveReducer} from './searchResults'
import {selectedItemReducer} from './selectedItem'
import {categoryReducer} from './category'
import {tabReducer} from './tabs'



export default combineReducers({
    newWorld: newWorldReducer,
    countdown: countdownReducer,
    pakSave: pakSaveReducer,
    searchedNewWorldItems: searchedNewWorldReducer,
    searchedCountdownItems: searchedCountdownReducer,
    serchedPakSaveItems: searchedPakSaveReducer,
    selectedItems: selectedItemReducer,
    categorys: categoryReducer,
    tabs: tabReducer
})