import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session';
import { fetchNotes } from '../../actions/notes';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
