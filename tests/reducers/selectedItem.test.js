import {selectedItemReducer} from '../../client/reducer/selectedItem'


describe('Selected Item reducer', () => {
    test(' Selected item reducer should return default state', () => {
        const newState = selectedItemReducer(undefined, {})
        expect(newState).toEqual([])
    })

    
    test('Selected item reducer adds item to state', () => {
        const state = [{item: 'test 1', numOf: '1'}, {item: 'test 2', numOf: '1'}, {item: 'test 3', numOf: '1'}, {item: 'test 4', numOf: '1'}]
        const item = {item: 'test 5', numOf: '1'}
        const newState = selectedItemReducer(state, {
            type: "ITEM_SELECTED",
            item
        })
        expect(newState).toEqual([...state, item])
    })

    test('Selected item reducer edits number of item', () => {
        const state = [{name: 'test 1', numOf: '1', price: '1.20'}, {name: 'test 2', numOf: '1', price: '1.30'}, {name: 'test 3', numOf: '1', price: '1.40'}, {name: 'test 4', numOf: '1', price: '1.50'}]
        
        const item = {name: 'test 1', numOf: '2', price: '1.20'}

        const expectedState = [{name: 'test 1', numOf: '2', price: '1.20'}, {name: 'test 2', numOf: '1', price: '1.30'}, {name: 'test 3', numOf: '1', price: '1.40'}, {name: 'test 4', numOf: '1', price: '1.50'}]
        
        const newState = selectedItemReducer(state, {
            type: "EDIT_SELECTED_ITEM",
            name: item.name,
            num: item.numOf,
            price: item.price
        })
        expect(newState).toEqual(expectedState)
    })

    test('Selected item reducer removes item from state', () => {
        const state = [{name: 'test 1', numOf: '1', price: '1.20'}, {name: 'test 2', numOf: '1', price: '1.30'}, {name: 'test 3', numOf: '1', price: '1.40'}, {name: 'test 4', numOf: '1', price: '1.50'}]
        
        const expectedState = [{name: 'test 2', numOf: '1', price: '1.30', selected: false}, {name: 'test 3', numOf: '1', price: '1.40', selected: false}, {name: 'test 4', numOf: '1', price: '1.50', selected: false}]
        
        const item = {name: 'test 1', numOf: '1', price: '1.20'}
        const newState = selectedItemReducer(state, {
            type: "REMOVE_SELECTED_ITEM",
            name: item.name,
            price: item.price
        })
        expect(newState).toEqual(expectedState)
    })
})