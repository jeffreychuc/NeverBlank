import Notebooks from './notebooks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { destroyNotebook } from '../../actions/notebooks';


const mapStateToProps = (state, ownProps) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return({
    notes: state.entities.notebooks,
  });
};

const mapDispatchToProps = (dispatch) => ({
  destroyNotebook: (id) => dispatch(destroyNotebook(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notebooks));