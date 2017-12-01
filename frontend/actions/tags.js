import { getTags } from '../util/tags_api_util';
import { getNoteTags } from '../util/notes_api_util';
import { postTagging, deleteTagging} from '../util/taggings_api_util';
import { postTag } from '../util/tags_api_util';

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
  return tags;
};

export const taggingNote = (tagging) => (dispatch) => (
  postTagging(tagging).then(() => dispatch(getAllUserTags()))
);

export const createTag = (tagName) => (dispatch) => (
  postTag(tagName).then(()=> dispatch(getAllUserTags()))
)

export const removeTagging = (tagging) => (dispatch) => (
  deleteTagging(tagging).then(() => dispatch(getAllUserTags()))
);

export const createTagAndAttach = ({note_id, tagName}) => (dispatch) => (
  postTag(tagName).then((tag) => postTagging({tag_id: tag.id, note_id: note_id})).then(()=> getAllUserTags()
));

