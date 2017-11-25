import { SLIDE } from '../actions/ui';
import merge from 'lodash/merge';


const _initSlideState = { selected_id: null };


export default (state=_initSlideState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SLIDE:
      return merge({}, state, { selected_id: action.id });
    default:
      return state;
  }
};
