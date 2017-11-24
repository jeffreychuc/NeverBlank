import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import sessionErrorReducer from './session_error_reducer';

export default combineReducers({
  session: sessionReducer,
  errors: sessionErrorReducer
});
