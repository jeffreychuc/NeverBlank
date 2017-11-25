import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import NavSidebar from './nav_sidebar';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(NavSidebar);
