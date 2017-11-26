import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session';
import { fetchNotes } from '../../actions/notes';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
