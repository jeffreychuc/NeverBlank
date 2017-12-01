import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import { generateBlankNote } from '../../actions/notes';
import { toggleNotebookVisibility, setTagSidebarVisibility } from '../../actions/ui';
import NavSidebar from './nav_sidebar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  debugger;
  return ({
    notebookSidebarVisibility: state.ui.notebookSidebarVisibility,
    latestUpdatedNote: state.entities.notes.ordered.updated_at_desc[0],
    tagSlider: state.ui.tagSlider
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  toggleNotebookVisibility: (currentVisBool) => dispatch(toggleNotebookVisibility(currentVisBool)),
  setTagSidebarVisibility: (visibility) => dispatch(setTagSidebarVisibility(visibility))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavSidebar));
