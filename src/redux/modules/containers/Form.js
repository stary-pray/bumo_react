import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
const reducers = {
  form: formReducer
};
export default combineReducers(reducers);
