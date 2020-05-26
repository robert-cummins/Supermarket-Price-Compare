export const categoryReducer = (state = [{
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
}], action) => {

    switch (action.type) {
        case "CHANGE_CHECK":
            return state.map(category => {
                if (category.value == action.name && category.isChecked == false) {
                    category.isChecked = true
                    return category
                }
                else if (category.value == action.name && category.isChecked == true) {
                    category.isChecked = false
                    return category
                } else {
                    return category
                }
            })

        case "CHECK_ALL":
            return state.map(category => {
                category.isChecked = true
                return category
            })

        case "CHECK_NONE":
            return state.map(category => {
                category.isChecked = false
                return category
            })

        default:
            return state
    }
}