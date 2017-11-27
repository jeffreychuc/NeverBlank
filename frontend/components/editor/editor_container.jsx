import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { patchNotes, postNotes } from '../../actions/notes';

const mapStateToProps = (state, ownProps) => {
  return(
    {
      notes: state.entities.notes
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (note) => dispatch(patchNotes(note)),
  createNote: (note) => dispatch(postNotes(note))
});

export default withRouter(connect(null, mapDispatchToProps)(Editor));
