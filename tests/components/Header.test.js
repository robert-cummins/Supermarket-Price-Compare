import React from 'react'
import {shallow} from 'enzyme'
import Header from '../../client/components/Header'

const setUp = (props={}) => {
    const component = shallow(<Header {...props} />)
    return component
}

describe('Header Component', () => {

    let component,
        wrapper
    beforeEach(() => {
        component = setUp()
        wrapper = component.find('h1')
    })
    test('Header should render without errors', () => {
        expect(wrapper.length).toBe(1)
    })

    test('App title is correct', () => {
        expect(wrapper.text()).toEqual('Supermarket Price Compare')
    })
})

