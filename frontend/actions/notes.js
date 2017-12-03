import { getNotes, patchNote, postNote, deleteNote } from '../util/notes_api_util';
import { fetchNotebooks } from './notebooks';

export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';
export const ADD_BLANK_NOTE = 'ADD_BLANK_NOTE';

const receiveAllNotes = (notes) => ({
  type: RECEIVE_ALL_NOTES,
  notes: notes
});

export const fetchNotes = () => (dispatch) => (
  getNotes().then((notes) => dispatch(receiveAllNotes(notes)))
);

export const patchNotes = (note) => (dispatch) => (
  patchNote(note).then(() => dispatch(fetchNotes()))
);

export const postNotes = (note) => (dispatch) => (
  postNote(note).then(() => dispatch(fetchNotes()))
);

export const destroyNote = (id) => dispatch => (
  deleteNote(id).then(() => dispatch(fetchNotes()))
);
