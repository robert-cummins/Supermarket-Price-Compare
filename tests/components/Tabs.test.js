import Tabs from '../../client/components/Tabs'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/mockStore'
import {event} from '..//utils/mockStore'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<Tabs store={store} />).childAt(0).dive()
    return component 
}

describe('Tabs component', () => {
    
    let component

    // const event = {
    //     target: {
    //         name: 'test',
    //         getAttribute: function(){
    //             return true
    //         }
    //     }
    // }
    
    beforeEach(() => {
        const initialState = {
            tabs: []
        }
        component = setUp(initialState)
    })

    

    it('should render without error by finding 3 "a" elements ', () => {
        const wrapper = component.find('a')
        expect(wrapper.length).toBe(3)
    })

    it('should call the handleClick function', () => {
        const handleClick = jest.spyOn(component.instance(), 'handleClick')
        component.instance().handleClick(event)
        expect(handleClick).toBeCalled()
    })

})