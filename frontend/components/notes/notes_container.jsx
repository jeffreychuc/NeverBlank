import { connect } from 'react-redux';
import { currentNoteID } from '../../actions/ui.js';
import { slide } from '../../actions/ui';
import { withRouter } from 'react-router-dom';

import Notes from './notes';

const mapStateToProps = (state, ownProps) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return({
    notes: state.entities.notes,
  });
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default withRouter(connect(mapStateToProps, null)(Notes));
