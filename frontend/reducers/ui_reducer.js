import { SET_LOADING } from '../actions/ui';
import merge from 'lodash/merge';


const _initSlideState = { loading: true };

export default (state=_initSlideState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SET_LOADING:
      return {loading: action.loading};
    default:
      return state;
  }
};

