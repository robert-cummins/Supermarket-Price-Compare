import {getSelectedItems, editSelectedItems, removeSelectedItem} from '../../client/actions/selectedItems'
import configureStore from 'redux-mock-store'

describe('Searched Items Actions', () => {
    const mockStore = configureStore();
    const store = mockStore();

    beforeEach(() => {
        store.clearActions();
    })

    test('getSelectedItem action dispatches correct action and payload', () => {
        const fetchedItem = {name: "Example 4", numOf: 2, price: "4", selected: true}
    
        const expectedAction = [{
            item: fetchedItem,
            type: "ITEM_SELECTED"
        }]
     
        store.dispatch(getSelectedItems( {name: 'Example 4', price: '4'}, 2))
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('removeSelectedItem action dispatches correct action and payload', () => {
        const itemToBeEdited = {name: "Example 4", numOf: 2, price: "4", selected: true}
    
        const expectedAction = [{
            name: itemToBeEdited.name,
            num: itemToBeEdited.numOf,
            price: itemToBeEdited.price,
            type: "EDIT_SELECTED_ITEM"
        }]
     
        store.dispatch(editSelectedItems("Example 4", "4", 2))
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('editSelectedItem action dispatches correct action and payload', () => {
        const itemToBeRemoved = {name: "Example 4", numOf: 2, price: "4", selected: true}
    
        const expectedAction = [{
            name: itemToBeRemoved.name,
            price: itemToBeRemoved.price,
            type: "REMOVE_SELECTED_ITEM"
        }]
     
        store.dispatch(removeSelectedItem("Example 4", "4"))
        
        expect(store.getActions()).toEqual(expectedAction)
    })
})