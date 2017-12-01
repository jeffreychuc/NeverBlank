import Notes from './notes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyNote } from '../../actions/notes';
import { editNotebook, destroyNotebook } from '../../actions/notebooks';


const mapStateToProps = (state, ownProps) => {
 
  return({
    defaultNotebook: state.session.currentUser.default_notebook
  });
};

const mapDispatchToProps = (dispatch) => ({
  destroyNote: (id) => dispatch(destroyNote(id)),
  editNotebook: (notebook) => dispatch(editNotebook(notebook)),
  destroyNotebook: (id) => dispatch(destroyNotebook(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes));
