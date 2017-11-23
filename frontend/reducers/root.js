import { combineReducers } from 'redux';
import sessionReducer from './session';
import sessionErrorReducer from './session_error';

export default combineReducers({
  session: sessionReducer,
  errors: sessionErrorReducer
});
