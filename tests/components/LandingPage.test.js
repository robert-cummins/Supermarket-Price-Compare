import LandingPage from '../../client/components/LandingPage'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/utils'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<LandingPage store={store} />).childAt(0).dive()
    return component 
}

describe('Landing page component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            newWorld: [],
            countdown: [],
            pakSave: [],
            searchedNewWorldItems: [],
            searchedCountdownItems: [],
            serchedPakSaveItems: [],
            selectedItems: [],
            categorys: [],
            tabs: []
        }
        component = setUp(initialState)
    })

    

    it('should render without errors', () => {
        const wrapper = component.find('.check-all')
        expect(wrapper.length).toBe(1)
    })

    it('should call the handleCheck function and change the state', () => {
        const handleCheck = jest.spyOn(component.instance(), 'handleCheck')
        component.instance().handleCheck()
        expect(handleCheck).toBeCalled()
    })
})