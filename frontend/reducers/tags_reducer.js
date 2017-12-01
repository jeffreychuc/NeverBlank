import { RECEIVE_ALL_TAGS, RECEIVE_NOTE_TAGS } from '../actions/tags';
import { GET_NOTE_TAGS } from '../actions/notes';
import { isEmpty } from 'underscore';
import merge from 'lodash/merge';

export default (state = {}, action) =>  {
  Object.freeze(state);
  let oldState = state;
  switch(action.type) {
    case RECEIVE_ALL_TAGS:
      return merge({}, oldState, action.tags);
    case RECEIVE_NOTE_TAGS:
      return merge({}, oldState, {currentNoteTags: action.tags});
      default:
      return state;
  }
};
