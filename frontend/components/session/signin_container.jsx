import { connect } from 'react-redux';
import { createNewUser } from '../../actions/session';
import Signin from './signin';

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser))
});

export default connect(null, mapDispatchToProps)(Signin);
