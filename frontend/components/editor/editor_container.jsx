import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { patchNotes, postNotes } from '../../actions/notes';
import { getAllTagsForNote, taggingNote, createTag } from '../../actions/tags';


const mapStateToProps = (state, ownProps) => {
  return(
    {
      notebooks: state.entities.notebooks.ordered.created_at_desc,
      notebooksById: state.entities.notebooks.by_id,
      defaultNotebookId: state.session.currentUser.default_notebook,
      noteTags: state.entities.tags.by_id,
      currentNoteTags: state.entities.tags.currentNoteTags
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (note) => dispatch(patchNotes(note)),
  createNotes: (note) => dispatch(postNotes(note)),
  getAllTagsForNote: (id) => dispatch(getAllTagsForNote(id)),
  createNewTagging: ({tagging, tagName}) => dispatch(createTag(tagName)).then(() => dispatch(taggingNote(tagging)))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
