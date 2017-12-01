import Notebooks from './notebooks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyNotebook, createNotebook } from '../../actions/notebooks';
import { toggleNotebookVisibility } from '../../actions/ui';


const mapStateToProps = (state, ownProps) => {
 
  return({
    notebooks: state.entities.notebooks,
    notebookSidebarVisibility: state.ui.notebookSidebarVisibility
  });
};

const mapDispatchToProps = (dispatch) => ({
  destroyNotebook: (id) => dispatch(destroyNotebook(id)),
  createNotebook: (title) => dispatch(createNotebook(title)),
  toggleNotebookVisibility: (currentVisBool) => dispatch(toggleNotebookVisibility(currentVisBool))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notebooks));
