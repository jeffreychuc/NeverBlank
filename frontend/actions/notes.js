import { getNotes, patchNote, postNote } from '../util/notes_api_util';

export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';
export const ADD_BLANK_NOTE = 'ADD_BLANK_NOTE';

const receiveAllNotes = (notes) => ({
  type: RECEIVE_ALL_NOTES,
  notes: notes
});

const addBlankNote = () => ({
  type: ADD_BLANK_NOTE
});

export const fetchNotes = () => (dispatch) => (
  getNotes().then((notes) => dispatch(receiveAllNotes(notes)))
);

export const patchNotes = (note) => (dispatch) => (
  patchNote(note).then(() => getNotes()).then((notes) => dispatch(receiveAllNotes(notes)))
);

export const postNotes = (note) => (dispatch) => (
  postNote(note).then(() => getNotes()).then((notes) => dispatch(receiveAllNotes(notes)))
);

export const generateBlankNote = () => (dispatch) => dispatch(addBlankNote());
