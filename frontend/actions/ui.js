export const SLIDE = 'SLIDE';
export const slide = (id) => {

  return ({
    type: SLIDE,
    id: id
  });
};

export const SHOW_NOTE_IN_EDITOR = 'SHOW_NOTE_IN_EDITOR';
export const currentNoteID = (id) => {

  return {type: SHOW_NOTE_IN_EDITOR,
          id: id};
};

export const SET_LOADING = 'SET_LOADING';


export const setLoadingState = (loadingState) => {

  return {type: SET_LOADING,
          loading: loadingState};
};

export const SET_CURRENT_NOTEBOOK = 'SET_CURRENT_NOTEBOOK';

export const setCurrentNotebook = (id) => {

  return {type: SET_CURRENT_NOTEBOOK,
          currentNotebook: id};
};

export const TOGGLE_NOTEBOOK_VISIBILITY = 'TOGGLE_NOTEBOOK_VISIBILITY';

export const toggleNotebookVisibility = (visBool) => {

  return {type: TOGGLE_NOTEBOOK_VISIBILITY,
          notebookSidebarVisibility: visBool};
};

export const TOGGLE_TAGS_VISIBILITY = 'TOGGLE_TAGS_VISIBILITY';

export const setTagSidebarVisibility = (visBool) => {

  return {type: TOGGLE_TAGS_VISIBILITY,
          tagSlider: visBool};
};
