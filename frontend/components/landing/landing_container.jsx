import { connect } from 'react-redux';
import { createNewUser, loginDemo, logout } from '../../actions/session';
import { clearErrors } from '../../actions/errors';
import Landing from './landing';
import { withRouter } from 'react-router-dom';
import { fetchNotes } from '../../actions/notes';

const mapStateToProps = (state) => {
 
  return ({
    errors: state.errors,
    session: state.session
  });
};

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser)),
  loginDemo: () => dispatch(loginDemo()),
  clearErrors: () => dispatch(clearErrors()),
  fetchNotes: () => dispatch(fetchNotes()),
  logout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
