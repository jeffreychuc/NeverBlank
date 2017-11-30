import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { patchNotes, postNotes } from '../../actions/notes';

const mapStateToProps = (state, ownProps) => {
  // debugger;
  return(
    {
      notebooks: state.entities.notebooks.ordered.created_at_desc,
      notebooksById: state.entities.notebooks.by_id,
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (note) => dispatch(patchNotes(note)),
  createNotes: (note) => dispatch(postNotes(note))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Editor));
