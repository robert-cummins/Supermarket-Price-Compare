import SearchBar from '../../client/components/SearchBar'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/mockStore'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<SearchBar store={store} />).childAt(0).dive()
    return component 
}

describe('SearchBar component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            newWorld: [],
            countdown: [],
            pakSave: [],
            tabs: []
        }
        component = setUp(initialState)
    })

    

    it('should render without error by finding 1 input', () => {
        const wrapper = component.find('input')
        expect(wrapper.length).toBe(1)
    })

    it('should call the submit function', () => {
        const event = {
                preventDefault: function(){
                    return true
                }
            
        }
        const onSubmit = jest.spyOn(component.instance(), 'onSubmit')
        component.instance().onSubmit(event)
        expect(onSubmit).toBeCalled()
    })
})