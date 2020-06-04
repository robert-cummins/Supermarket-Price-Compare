import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../../client/reducer/index'

const middlewares = [thunk]

export const testStore = (intitilalState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(reducers, intitilalState)
}

export const expectedState = [{
    name: 'Example 1',
    price: '1'
}, {
    name: 'Example 2',
    price: '2'
}, {
    name: 'Example 3',
    price: '3'
}]

export const event = {
    preventDefault: function(){
        return true
    },
    target: {
        name: 'test',
        getAttribute: function(){
            return true
        }
    }
}