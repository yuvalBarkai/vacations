import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import vacationsReducer from './vacationsReducer';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    vacations:vacationsReducer,
});

export default allReducers