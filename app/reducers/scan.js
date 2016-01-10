import {
    SET_SINGLE_IMAGE, SET_CORRECT_IMAGE, SET_WRONG_IMAGE, SET_SCORE

} from '../actions';

const initialState =
    {
        correctImage: [1, 2, 3],
        wrongImage: [
            { value: [1, 2, 3], correct: false,  index: 0},
            { value: [1, 2, 3], correct: false,  index: 1},
            { value: [1, 2, 3], correct: false,  index: 2},
            { value: [1, 2, 3], correct: false,  index: 3}
        ],
        score: 0
    }


export function scan(state = initialState, action = null) {
    switch (action.type) {
        case SET_CORRECT_IMAGE:
            return Object.assign({}, state, { correctImage: action.value });

        case SET_WRONG_IMAGE:
            return Object.assign({}, state, {wrongImage: state.wrongImage.map(
                    image =>
                    image.index === action.index ?
                        Object.assign({}, image, {
                            value: action.value,
                            correct: action.correct
                        }) :
                        image
            )})

        case SET_SCORE:
            return Object.assign({}, state, {
                score: action.value
            });

        default:
            return state
    }
}