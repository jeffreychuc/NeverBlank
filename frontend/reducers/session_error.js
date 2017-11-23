import { RECEIVE_SESSION_ERRORS } from '../actions/session';
import merge from 'lodash/merge';

export default (state={session: [] }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      console.log('receiving session errors');
      return merge({session: action.errors});
    default:
      return state;
  }
};
