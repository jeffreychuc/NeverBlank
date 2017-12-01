import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { patchNotes, postNotes } from '../../actions/notes';
import { getAllTagsForNote, taggingNote, createTag, createTagAndAttach } from '../../actions/tags';
import { isEmpty } from "underscore";


const mapStateToProps = (state, ownProps) => {

 
  return(
    {
      notebooks: state.entities.notebooks.ordered.created_at_desc,
      notebooksById: state.entities.notebooks.by_id,
      defaultNotebookId: state.session.currentUser.default_notebook,
      noteTags: state.entities.tags.by_id,
      currentNoteTags: !isEmpty(state.entities.tags) ? !isEmpty(state.entities.tags.currentNoteTags) ? state.entities.tags.currentNoteTags.currentNoteTags: [] : []
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (note) => dispatch(patchNotes(note)),
  createNotes: (note) => dispatch(postNotes(note)),
  getAllTagsForNote: (id) => dispatch(getAllTagsForNote(id)),
  createTagAndAttach:({note_id, tagName}) => dispatch(createTagAndAttach({note_id, tagName})),
  deleteTag: (id) => dispatch()
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
