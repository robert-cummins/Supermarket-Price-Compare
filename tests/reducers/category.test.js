import {categoryReducer} from '../../client/reducer/category'

describe('Category reducer', () => {
    const state = [{
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

    test('Category reducer should return default state', () => {
        const newState = categoryReducer(undefined, {})
        expect(newState).toEqual(state)
    })

    const name = "Fresh food, chilled and bakery"

    test('Category reducer should change isChecked boolean for one category', () => {
        const newState = categoryReducer(undefined, {
            type: 'CHANGE_CHECK',
            name
        })
        expect(newState[0].isChecked).toEqual(false)
    })

    test('Category reducer should change isChecked for all categorys to true', () => {
        const testState = [{
            id: 12345,
            value: "Fresh food, chilled and bakery",
            isChecked: false
        },
        {
            id: 12346,
            value: "Frozen",
            isChecked: false
        },
        {
            id: 12347,
            value: "Pantry and non perishables",
            isChecked: false
        }]
        const newState = categoryReducer(testState, {
            type: "CHECK_ALL",
        })
        expect(newState[0].isChecked).toEqual(true)
        expect(newState[1].isChecked).toEqual(true)
        expect(newState[2].isChecked).toEqual(true)
    })

    test('Category reducer should change isChecked for all categorys to false', () => {
        const newState = categoryReducer(state, {
            type: 'CHECK_NONE',
        })
        expect(newState[0].isChecked).toEqual(false)
        expect(newState[1].isChecked).toEqual(false)
        expect(newState[2].isChecked).toEqual(false)
        expect(newState[3].isChecked).toEqual(false)
        expect(newState[4].isChecked).toEqual(false)
        expect(newState[5].isChecked).toEqual(false)
        expect(newState[6].isChecked).toEqual(false)
    })

})