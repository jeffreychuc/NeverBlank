import { combineReducers } from 'redux';

import notes from './notes_reducer';
import notebooks from './notebooks_reducer';

export default combineReducers({
  notes, notebooks
});
