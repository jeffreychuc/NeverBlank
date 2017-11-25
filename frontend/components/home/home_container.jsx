import { connect } from 'react-redux';
import Home from './home';
import { logout } from '../../actions/session';
import { slide } from '../../actions/ui';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, null)(Home);
