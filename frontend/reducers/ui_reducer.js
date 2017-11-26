import { SLIDE, SHOW_NOTE_IN_EDITOR } from '../actions/ui';
import merge from 'lodash/merge';


const _initSlideState = { selected_id: null };

export default (state=_initSlideState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SLIDE:
      return merge({}, state, { selected_id: action.id });
    case SHOW_NOTE_IN_EDITOR:
      return merge({}, {current_editor_note: action.id});
    default:
      return state;
  }
};

