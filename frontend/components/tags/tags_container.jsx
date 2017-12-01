import { connect } from 'react-redux';
import { getAllUserTags } from '../../actions/tags';
import { withRouter } from 'react-router-dom';
import Tags from './tags';


const mapStateToProps = (state) => {
  console.log(state, 'IN MAP TO PROPS IN HOME CONTAINER');
  // debugger;
  console.log('USER TAGS SHOULD BE ', state.entities.tags);
  return ({
    userTags: state.entities.tags,
    tagSlider: state.ui.tagSlider
  });
};

const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getAllUserTags()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tags));
