import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../client/reducer/index'
import moxios from 'moxios'
import { fetchNewWorldData } from '../../client/actions/supermarkets'
import "@babel/polyfill"


const middlewares = [thunk]

const testStore = (intitilalState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(reducers, intitilalState)
}

describe('Supermarket actions', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    test('Store is updated correctly', () => {
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


})

