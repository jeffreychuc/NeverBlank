import { connect } from 'react-redux';
import Editor from './editor';
import { logout } from '../../actions/session';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
