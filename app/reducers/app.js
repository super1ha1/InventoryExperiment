
import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    contentAreaWidth: '100%'
});

export function app(state = defaultState, action = null) {
    switch(action.type) {
        default: {
            return state
        }
    }
};
