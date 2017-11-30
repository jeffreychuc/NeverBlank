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

export const SET_CURRENT_NOTEBOOK = 'SET_CURRENT_NOTEBOOK';

export const setCurrentNotebook = (id) => {
  console.log('current notebook ', id);
  return {type: SET_CURRENT_NOTEBOOK,
          currentNotebook: id};
};

export const TOGGLE_NOTEBOOK_VISIBILITY = 'TOGGLE_NOTEBOOK_VISIBILITY';

export const toggleNotebookVisibility = (visBool) => {
  console.log('current notebookvisibility is ', visBool);
  return {type: TOGGLE_NOTEBOOK_VISIBILITY,
          notebookSidebarVisibility: !visBool};
};
