import { RECEIVE_ALL_NOTES, SAVE_CURRENT_NOTE, ADD_BLANK_NOTE } from '../actions/notes';
import merge from 'lodash/merge';
const BLANK_NOTE = {"by_id":
                                {
                      "new": {
                                  "id": null,
                                  "author_id": null,
                                  "notebook_id": null,
                                  "title": null,
                                  "body": null,
                                  "bodypreview": null,
                                }
                              }
                  };
export default (state=null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_NOTES:
      console.log('receiving all notes');
      return action.notes;
    case ADD_BLANK_NOTE:
      console.log('adding blank note');
      return merge({}, state, BLANK_NOTE);
    default:
      return state;
  }
};
