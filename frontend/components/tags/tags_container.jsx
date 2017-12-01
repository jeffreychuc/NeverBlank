import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Tags from './tags';
import { getAllUserTags, taggingNote, removeTagging } from '../../actions/tags';
import { setTagSidebarVisibility } from '../../actions/ui';


const mapStateToProps = (state) => {
 
  // 
 
  return ({
    userTags: state.entities.tags,
    tagSlider: state.ui.tagSlider
  });
};

const mapDispatchToProps = (dispatch) => ({
  getTags: () => dispatch(getAllUserTags()),
  setTagSidebarVisibility: () => dispatch(setTagSidebarVisibility()),
  taggingNote: (tagging) => dispatch(taggingNote(tagging)),
  removeTagging: (tagging) => dispatch(removeTagging(tagging))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tags));
