import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import Home from './home';

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser))
});

export default connect(null, mapDispatchToProps)(Home);
