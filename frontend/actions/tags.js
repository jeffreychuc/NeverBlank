import { getTags } from '../util/tags_api_util';
import { getNoteTags } from '../util/notes_api_util';

export const RECEIVE_ALL_TAGS = 'RECEIVE_ALL_TAGS';
export const RECEIVE_NOTE_TAGS = 'RECEIVE_NOTE_TAGS';

export const receiveAllTags = (tags) => ({
  type: RECEIVE_ALL_TAGS,
  tags: tags
});

export const getAllUserTags = () => (dispatch) => (
  getTags().then((tags) => dispatch(receiveAllTags(tags)))
);

export const receiveNoteTags = (tags) => ({
  type: RECEIVE_NOTE_TAGS,
  tags: tags
});


export const getAllTagsForNote = (id) => (dispatch) => (
  getNoteTags(id).then((tags) => debug(tags)).then((tags) => tags ? dispatch(receiveNoteTags(tags)) : null)
);

export const debug = (tags) => {
  debugger;
  return tags;
};
