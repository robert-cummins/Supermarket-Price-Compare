import {getSelectedItems} from '../../client/actions/selectedItems'
import configureStore from 'redux-mock-store'

describe('Searched Items Actions', () => {
    const mockStore = configureStore();
    const store = mockStore();

    test('getSelectedItem action dispatches correct action and payload', () => {
        const fetchedItem = {name: "Example 4", numOf: 2, price: "4", selected: true}
    
        const expectedAction = [{
            item: fetchedItem,
            type: "ITEM_SELECTED"
        }]
     
        store.dispatch(getSelectedItems( {name: 'Example 4', price: '4'}, 2))
        
        expect(store.getActions()).toEqual(expectedAction)
    })
})