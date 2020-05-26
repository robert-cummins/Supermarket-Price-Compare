import {tabReducer} from '../../client/reducer/tabs'

describe('Tabs reducer', () => {
    test('Tabs reducer should return default state', () => {
        const defaultTabState = [{activeTab: 'instructions'}]
        const newState = tabReducer([{activeTab: 'instructions'}], {})
        expect(newState).toEqual(defaultTabState)
    })

    test('Tabs reducer should return "search" as active tab', () => {
        const defaultTabState = [{activeTab: 'instructions'}]
        const newState = tabReducer(defaultTabState, {
            type: "SEARCH_RESULTS_TAB"
        })
        expect(newState.activeTab).toEqual('search')
    })

    test('Tabs reducer should return "shopping" as active tab', () => {
        const defaultTabState = [{activeTab: 'instructions'}]
        const newState = tabReducer(defaultTabState, {
            type: "SHOPPPING_BASKET_TAB"
        })
        expect(newState.activeTab).toEqual('shopping')
    })

    test('Tabs reducer should return "instructions" as active tab', () => {
        const defaultTabState = [{activeTab: 'instructions'}]
        const newState = tabReducer(defaultTabState, {
            type: "INSTRUCTIONS_TAB"
        })
        expect(newState.activeTab).toEqual('instructions')
    })
})