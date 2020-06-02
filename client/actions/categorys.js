export const changeCategorys = (name) => {
    return {
        type: 'CHANGE_CHECK',
        name
    }
}

export const checkAll = () => {
    return {
        type: 'CHECK_ALL'
    }
}

export const checkNone = () => {
    return {
        type: 'CHECK_NONE'
    }
}