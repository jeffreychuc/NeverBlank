import { postUser, postSession, deleteSession } from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const demoUser = {email: "demo@appacademy.io", password: "password"};

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors
});

export const createNewUser = (formUser) => (dispatch) => (
  postUser(formUser).then((user) => dispatch(receiveCurrentUser(user)), (error)=> dispatch(receiveErrors(error.responseJSON)))
);

export const login = (formUser) => (dispatch) => (
  postSession(formUser).then((user) => dispatch(receiveCurrentUser(user)), (error)=> dispatch(receiveErrors(error.responseJSON)))
);

export const logout = () => (dispatch) => (
  deleteSession().then(() => dispatch(logoutCurrentUser()), (error)=> dispatch(receiveErrors(error.responseJSON)))
);

export const loginDemo = () => (dispatch) =>  (
  postSession(demoUser).then((user) => dispatch(receiveCurrentUser(user)), (error) => dispatch(receiveErrors(error.responseJSON)))
);
