import { SET_LOADING, SET_CURRENT_NOTEBOOK, TOGGLE_NOTEBOOK_MODAL } from '../actions/ui';
import merge from 'lodash/merge';


const _initSlideState = { loading: true, notebookModal: false };

export default (state=_initSlideState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SET_LOADING:
      return {loading: action.loading};
    case SET_CURRENT_NOTEBOOK:
      return {currentNotebook: action.notebookId};
    default:
      return state;
  }
};

