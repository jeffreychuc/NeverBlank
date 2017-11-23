import { connect } from 'react-redux';
import { login } from '../../actions/session';
import Signin from './signin';

const mapStateToProps = (state) => {
  console.log(state, 'IN MAP TO PROPS IN HOME CONTAINER');
  return ({ errors: state.errors });
};


const mapDispatchToProps = (dispatch) => ({
  login: (formUser) => dispatch(login(formUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
