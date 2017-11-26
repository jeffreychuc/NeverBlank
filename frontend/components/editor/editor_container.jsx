import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';
import { saveNote } from '../../actions/notes';

const mapStateToProps = (state, ownProps) => {
  return(
    {
      notes: state.entities.notes
    }
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveNote: (note) => dispatch(saveNote(note))
});

export default withRouter(connect(null, null)(Editor));
