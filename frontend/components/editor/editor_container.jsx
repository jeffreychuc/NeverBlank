import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { saveNotes } from '../../actions/notes';

const mapStateToProps = (state, ownProps) => {
  return(
    {
      notes: state.entities.notes
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (note) => dispatch(saveNotes(note))
});

export default withRouter(connect(null, mapDispatchToProps)(Editor));
