import Checkboxes from '../../client/components/Checkboxes'
import {shallow} from 'enzyme'
import React from 'react'
import {testStore} from '../utils/utils'
import {event} from '../utils/utils'
import "@babel/polyfill"


const setUp = (initialState = {}) => {
    const store = testStore(initialState)
    const component = shallow(<Checkboxes store={store} />).childAt(0).dive()
    return component 
}

describe('Checkboxes component', () => {
    
    let component
    
    beforeEach(() => {
        const initialState = {
            categorys: [{
                id: 12345,
                value: "Fresh food, chilled and bakery",
                isChecked: true
            },
            {
                id: 12346,
                value: "Frozen",
                isChecked: true
            },
            {
                id: 12347,
                value: "Pantry and non perishables",
                isChecked: true
            },
            {
                id: 12348,
                value: "Beer, cider and wine",
                isChecked: true
            },
            {
                id: 12349,
                value: "Personal Care",
                isChecked: true
            },
            {
                id: 12350,
                value: "Baby toddler",
                isChecked: true
            },
            {
                id: 12351,
                value: "Kitchen, dining and household",
                isChecked: true
            }]
        }
        component = setUp(initialState)
    })

    

    it('should render 7 checkboxes without error', () => {
        const wrapper = component.find('.category-checkbox')
        expect(wrapper.length).toBe(7)
    })

    it('should call the handleCheck function', () => {
        const handleCheck = jest.spyOn(component.instance(), 'handleCheck')
        component.instance().handleCheck(event)
        expect(handleCheck).toBeCalled()
    })
})