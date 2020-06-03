import configureStore from 'redux-mock-store'
import {activateSearchTab, activateShoppingTab, activateInstructionsTab} from '../../client/actions/tabs'

describe('Tabs Actions', () => {
    const mockStore = configureStore();
    const store = mockStore();

    beforeEach(() => {
        store.clearActions();
    })

    test('ActivateSearchTab action dispatches correct action', () => {
        
        const expectedAction = [{
            type: "SEARCH_RESULTS_TAB"
        }]
     
        store.dispatch(activateSearchTab())
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('ActivateShoppingTab action dispatches correct action', () => {
        
        const expectedAction = [{
            type: "SHOPPPING_BASKET_TAB"
        }]
     
        store.dispatch(activateShoppingTab())
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('ActivateInstructionsTab action dispatches correct action', () => {
        
        const expectedAction = [{
            type: "INSTRUCTIONS_TAB"
        }]
     
        store.dispatch(activateInstructionsTab())
        
        expect(store.getActions()).toEqual(expectedAction)
    })
})