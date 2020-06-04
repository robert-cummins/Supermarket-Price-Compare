import SearchReasults from '../../client/components/SearchResults'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/mockStore'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<SearchReasults store={store} />).childAt(0).dive()
    return component 
}

describe('SearchBar component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            searchedNewWorldItems: [],
            searchedCountdownItems: [],
            serchedPakSaveItems: [],
        }
        component = setUp(initialState)
    })

    

    it('should render without error with className="table-container"', () => {
        const wrapper = component.find('.table-container')
        expect(wrapper.length).toBe(1)
    })

    // it('should call the submit function', () => {
    //     const event = {
    //             preventDefault: function(){
    //                 return true
    //             }
            
    //     }
    //     const onSubmit = jest.spyOn(component.instance(), 'onSubmit')
    //     component.instance().onSubmit(event)
    //     expect(onSubmit).toBeCalled()
    // })
})