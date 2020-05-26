import {newWorldReducer, countdownReducer, pakSaveReducer} from '../../client/reducer/supermarkets'


describe('Supermarket items reducer', () => {
    test(' New World reducer should return default state', () => {
        const newState = newWorldReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test(' Countdown reducer should return default state', () => {
        const newState = countdownReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test('Pak N Save reducer should return default state', () => {
        const newState = pakSaveReducer(undefined, {})
        expect(newState).toEqual([])
    })

    test(' New World reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = newWorldReducer(undefined, {
            type: "GET_NEWWORLD_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })

    test('Countdown reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = countdownReducer(undefined, {
            type: "GET_COUNTDOWN_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })

    test('Pak N Save reducer should return new state if receiving type', () => {
        const items = [{item: 'test 1'}, {item: 'test 2'}, {item: 'test 3'}, {item: 'test 4'}]
        const newState = pakSaveReducer(undefined, {
            type: "GET_PAKSAVE_ITEMS",
            items
        })
        expect(newState).toEqual(items)
    })
})