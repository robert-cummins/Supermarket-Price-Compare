import React from 'react'
import {shallow} from 'enzyme'
import Spinner from '../../client/components/Spinner'



describe('Spinner Component', () => {

    test('Instructions renders without error', () => {
        const component = shallow(<Spinner/>)
        const wrapper = component.find('div')
        expect(wrapper.length).toBe(1)
    })
})