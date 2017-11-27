import { RECEIVE_ALL_NOTES, SAVE_CURRENT_NOTE } from '../actions/notes';
import merge from 'lodash/merge';

export default (state=null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_NOTES:
      console.log('receiving all notes');
      return action.notes;
    default:
      return state;
  }
};
