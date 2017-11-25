import { connect } from 'react-redux';
import Editor from './editor';

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, null)(Editor);
