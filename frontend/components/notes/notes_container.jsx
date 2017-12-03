import Notes from './notes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyNote } from '../../actions/notes';
import { editNotebook, destroyNotebook } from '../../actions/notebooks';


const mapStateToProps = (state, ownProps) => {
  return({
    defaultNotebook: state.session.currentUser.default_notebook,
    notesById: state.entities.notes.by_id,
    notesOrdered: state.entities.notes.ordered.updated_at_desc,
    notebooks: state.entities.notebooks.by_id
  });
};

const mapDispatchToProps = (dispatch) => ({
  destroyNote: (id) => dispatch(destroyNote(id)),
  editNotebook: (notebook) => dispatch(editNotebook(notebook)),
  destroyNotebook: (id) => dispatch(destroyNotebook(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));
