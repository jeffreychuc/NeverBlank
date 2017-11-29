import { RECEIVE_ALL_NOTEBOOKS } from '../actions/notebooks';
import merge from 'lodash/merge';

export default (state=null, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ALL_NOTEBOOKS:
      console.log('receiving all notebooks');
      return action.notebooks;
    default:
      return state;
  }
};
