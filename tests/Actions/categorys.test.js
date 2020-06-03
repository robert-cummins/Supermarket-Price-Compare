import configureStore from 'redux-mock-store'
import {changeCategorys, checkAll, checkNone} from '../../client/actions/categorys'

describe('Category Actions', () => {
    const mockStore = configureStore();
    const store = mockStore();

    beforeEach(() => {
        store.clearActions();
    })

    test('changeCategory action dispatches correct action and payload', () => {
        const name = "Meat"
    
        const expectedAction = [{
            name,
            type: "CHANGE_CHECK"
        }]
     
        store.dispatch(changeCategorys(name))
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('checkAll action dispatches correct action', () => {
        
        const expectedAction = [{
            type: "CHECK_ALL"
        }]
     
        store.dispatch(checkAll())
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('checkNone action dispatches correct action', () => {
        
        const expectedAction = [{
            type: "CHECK_NONE"
        }]
     
        store.dispatch(checkNone())
        
        expect(store.getActions()).toEqual(expectedAction)
    })
})