export const SET_SINGLE_IMAGE = 'SET_SINGLE_IMAGE'
export const SET_CORRECT_IMAGE = 'SET_CORRECT_IMAGE'
export const SET_WRONG_IMAGE = 'SET_WRONG_IMAGE'


export function setCorrectImage(value){
    return {
        type: SET_CORRECT_IMAGE,
        value
    }
}
export function setSingleImage(value){
    return {
        type: SET_SINGLE_IMAGE,
         value
    }
}

export function setWrongImage(index, value, correct){
    return {
        type: SET_WRONG_IMAGE,
        index,
        value,
        correct
    }
}