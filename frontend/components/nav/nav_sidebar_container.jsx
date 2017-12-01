import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import { generateBlankNote } from '../../actions/notes';
import { toggleNotebookVisibility } from '../../actions/ui';
import NavSidebar from './nav_sidebar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  // //
  return ({
    notebookSidebarVisibility: state.ui.notebookSidebarVisibility,
    latestUpdatedNote: state.entities.notes.ordered.updated_at_desc[0]
  });
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  toggleNotebookVisibility: (currentVisBool) => dispatch(toggleNotebookVisibility(currentVisBool))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavSidebar));
