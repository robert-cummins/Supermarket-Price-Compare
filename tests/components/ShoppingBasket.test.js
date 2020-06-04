import ShoppingBasket from '../../client/components/ShoppingBasket'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/utils'
import {event} from '../utils/utils'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<ShoppingBasket store={store} />).childAt(0).dive()
    return component 
}

describe('ShoppingBasket component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            searchedNewWorldItems: [],
            searchedCountdownItems: [],
            serchedPakSaveItems: [],
            selectedItems: [{name: 'test'}]
        }
        component = setUp(initialState)
    })

    

    it('should render without error by finding a table ', () => {
        const wrapper = component.find('table')
        expect(wrapper.length).toBe(1)
    })

    it('should call the changeValue function', () => {
       const changeValue = jest.spyOn(component.instance(), 'changeValue')
        component.instance().changeValue(event)
        expect(changeValue).toBeCalled()
    })

    it('should call the handleClick function', () => {
        const handleClick = jest.spyOn(component.instance(), 'handleClick')
        component.instance().handleClick(event)
        expect(handleClick).toBeCalled()
    })

    it('should call the handleDelete function', () => {
        const handleDelete = jest.spyOn(component.instance(), 'handleDelete')
        component.instance().handleDelete(event)
        expect(handleDelete).toBeCalled()
    })
})