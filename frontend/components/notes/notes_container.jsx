import { connect } from 'react-redux';
import Notes from './notes';

const mapStateToProps = (state) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return(state);
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, null)(Notes);
