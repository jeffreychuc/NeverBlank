import { SET_LOADING, SET_CURRENT_NOTEBOOK, TOGGLE_NOTEBOOK_MODAL, TOGGLE_NOTEBOOK_VISIBILITY, TOGGLE_TAGS_VISIBILITY } from '../actions/ui';
import merge from 'lodash/merge';


const _initSlideState = { loading: true, notebookModal: false, notebookSidebarVisibility: false, tagSlider: false };

export default (state=_initSlideState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SET_LOADING:
      return merge({}, state, {loading: action.loading});
    case SET_CURRENT_NOTEBOOK:
      return merge({}, state, {currentNotebook: action.notebookId});
    case TOGGLE_NOTEBOOK_VISIBILITY:
      return merge({}, state, {notebookSidebarVisibility: action.notebookSidebarVisibility});
    case TOGGLE_TAGS_VISIBILITY:
      return merge({}, state, {tagSlider: action.tagSlider});
    default:
      return state;
  }
};

