import { RECEIVE_SESSION_ERRORS } from '../actions/session';
import { CLEAR_ERRORS } from '../actions/errors';
import merge from 'lodash/merge';

const _nullError = {
  session: [] 
};

export default (state=_nullError, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      console.log('receiving session errors');
      return action.errors;
    case CLEAR_ERRORS:
      return _nullError;
    default:
      return state;
  }
};
