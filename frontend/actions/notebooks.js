import { getNotebooks, deleteNotebook } from '../util/notebooks_api_util';

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
  deleteNotebook(id).then(() => getNotebooks()).then((notebooks) => dispatch(receiveAllNotebooks(notebooks)))
);
