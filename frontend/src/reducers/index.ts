import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import loggedReducer from './loggedReducer';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    counter:counterReducer
});

export default allReducers