import { getNotes } from '../util/notes_api_util';

export const RECEIVE_ALL_NOTES = 'RECEIVE_ALL_NOTES';

const receiveAllNotes = (notes) => ({
  type: RECEIVE_ALL_NOTES,
  notes: notes
});

export const fetchNotes = () => (dispatch) => (
  getNotes().then((notes) => dispatch(receiveAllNotes(notes)))
);
