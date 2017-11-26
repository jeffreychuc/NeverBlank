import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import NavSidebar from './nav_sidebar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(null, mapDispatchToProps)(NavSidebar));
