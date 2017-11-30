import { getNotebooks, deleteNotebook, postNotebook, patchNotebook } from '../util/notebooks_api_util';
import { fetchNotes } from './notes';
import { postNote } from '../util/notes_api_util';

export const RECEIVE_ALL_NOTEBOOKS = 'RECEIVE_ALL_NOTEBOOKS';
export const ADD_BLANK_NOTE = 'ADD_BLANK_NOTEBOOK';

const receiveAllNotebooks = (notebooks) => ({
  type: RECEIVE_ALL_NOTEBOOKS,
  notebooks: notebooks
});

export const fetchNotebooks = () => (dispatch) => (
  getNotebooks().then((notebooks) => dispatch(receiveAllNotebooks(notebooks)))
);

export const destroyNotebook = (id) => (dispatch) => (
  deleteNotebook(id).then(() => dispatch(fetchNotebooks())).then(() => dispatch(fetchNotes()))
);

export const createNotebook = (title) => (dispatch) => (
  postNotebook(title).then(() => dispatch(fetchNotebooks())).then(() => dispatch(fetchNotes()))
);

export const editNotebook = (notebook) => (dispatch) => (
  patchNotebook(notebook).then(() => dispatch(fetchNotebooks()))
);
