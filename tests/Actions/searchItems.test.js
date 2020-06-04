import configureStore from 'redux-mock-store'
import {getSearchedNewWorldItems, getSearchedCountdownItems, getSearchedPakSaveItems} from '../../client/actions/searchItems'
import {expectedItems} from '../utils/utils'

describe('Searched Items Actions', () => {
    const mockStore = configureStore();
    const store = mockStore();

    beforeEach(() => {
        store.clearActions();
    })

    test('getSearchedNewWorldItems action dispatches correct action and payload', () => {
        
        const expectedAction = [{
            items: expectedItems,
            type: "GET_SEARCHED_NEWWORLD_ITEMS"
        }]
     
        store.dispatch(getSearchedNewWorldItems(expectedItems))
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('getSearchedCountdownItems action dispatches correct action and payload', () => {
        
        const expectedAction = [{
            items: expectedItems,
            type: "GET_SEARCHED_COUNTDOWN_ITEMS"
        }]
     
        store.dispatch(getSearchedCountdownItems(expectedItems))
        
        expect(store.getActions()).toEqual(expectedAction)
    })

    test('getSearchedCountdownItems action dispatches correct action and payload', () => {
        
        const expectedAction = [{
            items: expectedItems,
            type: "GET_SEARCHED_PAKSAVE_ITEMS"
        }]
     
        store.dispatch(getSearchedPakSaveItems(expectedItems))
        
        expect(store.getActions()).toEqual(expectedAction)
    })
})