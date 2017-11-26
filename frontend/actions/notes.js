import { getNotes } from '../util/notes_api_util';

export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';
export const SAVE_CURRENT_NOTE = 'SAVE_CURRENT_NOTE';

const receiveAllNotes = (notes) => ({
  type: RECEIVE_ALL_NOTES,
  notes: notes
});

export const fetchNotes = () => (dispatch) => (
  getNotes().then((notes) => dispatch(receiveAllNotes(notes)))
);

const receiveNoteSave = (note) => ({
  type: SAVE_CURRENT_NOTE,
  note: note
});

export const saveNote = (note) => (dispatch) => (
  dispatch(receiveNoteSave(note))
);
