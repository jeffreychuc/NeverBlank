export const SLIDE = 'SLIDE';
export const slide = (id) => {
  console.log('SLIDING');
  return ({
    type: SLIDE,
    id: id
  });
};

export const SHOW_NOTE_IN_EDITOR = 'SHOW_NOTE_IN_EDITOR';
export const currentNoteID = (id) => {
  console.log('current note in state should be set to ', id);
  return {type: SHOW_NOTE_IN_EDITOR,
          id: id};
};

export const SET_LOADING = 'SET_LOADING';

export const setLoadingState = (loadingState) => {
  console.log('current loading state ', loadingState);
  return {type: SET_LOADING,
          loading: loadingState};
};
