import { connect } from 'react-redux';
import { fetchNotes } from '../../actions/notes';
import Notes from './notes';

const mapStateToProps = (state) => {
  console.log(state, 'IN MAP TO PROPS IN NOTES CONTAINER');
  return({
    notes: state.entities.notes
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
