import { combineReducers } from 'redux';
import checkedReducer from './checkedReducer';
import loggedReducer from './loggedReducer';
import vacationsReducer from './vacationsReducer';

const allReducers = combineReducers({
    logged: loggedReducer,
    vacations:vacationsReducer,
    checkedVacations: checkedReducer
});

export default allReducers