import Immutable from 'immutable';

export default store => next => action => {
    console.log(action, Immutable.fromJS(store.getState()).toJS())
    return next(action)
}
