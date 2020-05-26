import {searchedNewWorldReducer, searchedCountdownReducer, searchedPakSaveReducer} from '../../client/reducer/searchResults'


describe('Search results reducer', () => {
    test(' New World search results reducer should return default state', () => {
        const newState = searchedNewWorldReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test(' Countdown search results reducer should return default state', () => {
        const newState = searchedCountdownReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test('Pak N Save search results reducer should return default state', () => {
        const newState = searchedPakSaveReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test(' New World search results reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = searchedNewWorldReducer(undefined, {
            type: "GET_SEARCHED_NEWWORLD_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })

    test('Countdown search results reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = searchedCountdownReducer(undefined, {
            type: "GET_SEARCHED_COUNTDOWN_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })

    test('Pak N Save search results reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = searchedPakSaveReducer(undefined, {
            type: "GET_SEARCHED_PAKSAVE_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })
})