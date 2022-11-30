import { combineReducers } from 'redux';
import loggedReducer from './loggedReducer';
import vacationsReducer from './vacationsReducer';

const allReducers = combineReducers({
    logged: loggedReducer,
    vacations:vacationsReducer,
});

export default allReducers