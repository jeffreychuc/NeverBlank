import { connect } from 'react-redux';
import { login, loginDemo, createNewUser } from '../../actions/session';
import Signin from './signin';
import Signup from './signup';
import { clearErrors } from '../../actions/errors';

const mapStateToProps = (state) => {
 
  return ({ errors: state.errors });
};


const mapDispatchToProps = (dispatch) => ({
  login: (formUser) => dispatch(login(formUser)),
  clearErrors: () => dispatch(clearErrors()),
  loginDemo: () => dispatch(loginDemo()),
  createNewUser: (formUser) => dispatch(createNewUser(formUser)),
});

export const SigninContainer = connect(mapStateToProps, mapDispatchToProps)(Signin);
export const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);
