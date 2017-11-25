import { connect } from 'react-redux';

import { fetchNotes } from '../../actions/notes';
import { slide } from '../../actions/ui';

import Notes from './notes';


const mapStateToProps = (state, ownProps) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return({
    notes: state.entities.notes,
    selected: state.ui.selected_id === ownProps.id
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
  slide: (id) => dispatch(slide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
