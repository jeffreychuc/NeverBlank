import { connect } from 'react-redux';
import Editor from './editor';
import { withRouter } from 'react-router-dom';
import { getCurrentNote } from '../../util/route_util';

const mapStateToProps = (state, ownProps) => {
  return(
    {
      notes: state.entities.notes
    }
  );
};

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, null)(Editor));
