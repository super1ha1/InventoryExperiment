import {
    SET_SINGLE_IMAGE, SET_CORRECT_IMAGE, SET_WRONG_IMAGE, SET_SCORE, SET_SCORE_RECORD

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
        score: 0,
        scoreRecord:[
            {trial: 1, scan: 0, truck: 0},
            {trial: 2, scan: 0, truck: 0},
            {trial: 3, scan: 0, truck: 0},
            {trial: 4, scan: 0, truck: 0},
            {trial: 5, scan: 0, truck: 0},
            {trial: 6, scan: 0, truck: 0},
            {trial: 7, scan: 0, truck: 0},
            {trial: 8, scan: 0, truck: 0},
            {trial: 9, scan: 0, truck: 0},
            {trial: 10, scan: 0, truck: 0},
            {trial: 11, scan: 0, truck: 0},
            {trial: 12, scan: 0, truck: 0},
            {trial: 13, scan: 0, truck: 0},
            {trial: 14, scan: 0, truck: 0},
            {trial: 15, scan: 0, truck: 0},
            {trial: 16, scan: 0, truck: 0},
            {trial: 17, scan: 0, truck: 0},
            {trial: 18, scan: 0, truck: 0},
            {trial: 19, scan: 0, truck: 0},
            {trial: 20, scan: 0, truck: 0},
        ]
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

        case SET_SCORE_RECORD:
            return Object.assign({}, state, {
                scoreRecord: state.scoreRecord.map(
                   record =>
                   record.trial === action.trial ?
                       Object.assign({}, record, {
                           scan: action.scan,
                           truck: action.truck
                       }):
                       record
                )
            })
        default:
            return state
    }
}