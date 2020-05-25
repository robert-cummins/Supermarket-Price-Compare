import React from 'react'
import {shallow} from 'enzyme'
import Instructions from '../../client/components/Instructions'

const setUp = (props={}) => {
    const component = shallow(<Instructions {...props} />)
    return component
}

describe('Instructions Component', () => {

    let component

    beforeEach(() => {
        component = setUp()
    })

    test('Instructions renders without error', () => {
        const wrapper = component.find('p')
        expect(wrapper.length).toBe(1)
    })

    test('Instructions should have 4 bullet point instructions', () => {
        const wrapper = component.find('li')
        expect(wrapper.length).toEqual(5)
    })
})