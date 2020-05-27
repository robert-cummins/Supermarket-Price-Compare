export const getSelectedItems = (item, num) => {
    item.numOf = num
    item.selected = true
    return {
        type: 'ITEM_SELECTED',
        item
    }
}

export const editSelectedItems = (name, price, num) => {
    if(num === undefined){num = '1'}
    return {
        type: 'EDIT_SELECTED_ITEM',
        name,
        num,
        price
    }
}

export const removeSelectedItem = (name, price) => {
    return {
        type: 'REMOVE_SELECTED_ITEM',
        name,
        price
    }
}