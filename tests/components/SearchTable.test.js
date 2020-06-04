import SearchTable from '../../client/components/SearchTable'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/utils'
import {event} from '../utils/utils'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<SearchTable supermarket={'searchedNewWorldItems'} store={store} />).childAt(0).dive()
    return component 
}

describe('SearchTable component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            searchedNewWorldItems: [{name: 'carrots'}],
            searchedCountdownItems: [],
            serchedPakSaveItems: [],
            categorys: [],
            selectedItems: []
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
        component.instance().handleClick(event, {numOf:2})
        expect(handleClick).toBeCalled()
    })
})