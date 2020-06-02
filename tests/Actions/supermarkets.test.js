import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../client/reducer/index'
import moxios from 'moxios'
import { fetchNewWorldData, fetchCountdownData, fetchPakSaveData } from '../../client/actions/supermarkets'
import "@babel/polyfill"


const middlewares = [thunk]

const testStore = (intitilalState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(reducers, intitilalState)
}

const expectedState = [{
    name: 'Example 1',
    price: '1'
}, {
    name: 'Example 2',
    price: '2'
}, {
    name: 'Example 3',
    price: '3'
}]

describe('Supermarket actions', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('New world data action updates store', () => {
        

        const store = testStore()

        moxios.wait(() => {
            const request =  moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: expectedState
            })
        })

        return store.dispatch(fetchNewWorldData())
            .then(() => {
                const newState = store.getState()
                expect(newState.newWorld).toEqual(expectedState)
            })
    })

    test('Countdown data action updates store', () => {
        

        const store = testStore()

        moxios.wait(() => {
            const request =  moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: expectedState
            })
        })

        return store.dispatch(fetchCountdownData())
            .then(() => {
                const newState = store.getState()
                expect(newState.countdown).toEqual(expectedState)
            })
    })

    test('Pak N Save data action updates store', () => {
        

        const store = testStore()

        moxios.wait(() => {
            const request =  moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: expectedState
            })
        })

        return store.dispatch(fetchPakSaveData())
            .then(() => {
                const newState = store.getState()
                expect(newState.pakSave).toEqual(expectedState)
            })
    })


})

