import { connect } from 'react-redux';
import { createNewUser, loginDemo } from '../../actions/session';
import { clearErrors } from '../../actions/errors';
import Landing from './landing';

const mapStateToProps = (state) => {
  console.log(state, 'IN MAP TO PROPS IN HOME CONTAINER');
  return ({ errors: state.errors });
};

const mapDispatchToProps = (dispatch) => ({
  createNewUser: (formUser) => dispatch(createNewUser(formUser)),
  loginDemo: () => dispatch(loginDemo()),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
