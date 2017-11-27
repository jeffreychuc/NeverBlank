import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import { generateBlankNote } from '../../actions/notes';
import NavSidebar from './nav_sidebar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  addBlankNote: () => dispatch(generateBlankNote())
});

export default withRouter(connect(null, mapDispatchToProps)(NavSidebar));
