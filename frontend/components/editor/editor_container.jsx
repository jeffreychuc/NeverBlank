import { connect } from 'react-redux';
import Editor from './editor';
import { logout } from '../../actions/session';
import { slide } from '../../actions/ui';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  slide: (id) => dispatch(slide(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
