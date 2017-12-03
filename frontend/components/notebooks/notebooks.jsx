import React from 'react';
import Notebook from './notebook';
import shortid from 'shortid';
import { Button } from 'react-bootstrap';
import { createSlideToggle } from '../../util/css_util';

class Notebooks extends React.Component  {
  constructor (props)  {
    super(props);
    //
    //
    this.renderCreateNotebookModal = this.renderCreateNotebookModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleNewNotebookRedirect = this.handleNewNotebookRedirect.bind(this);

    const boundSlideToggle = createSlideToggle.bind(this);
    this.notebookScrollerToggle = boundSlideToggle('notebookScrollerClass', 'notebooks-scroller').bind(this);
    this.state = ({notebookCreateModal: false, notebookScrollerUnderlayClassname: 'notebooks-scroller slideable underoverlay slide-hide'});
    //
  }

  componentDidMount() {
    if (this.props.match.path === '/home/notebooks/') {
      this.props.toggleNotebookVisibility(false);
    }
  }

  componentWillReceiveProps(newProps) {

    //
   if (newProps.notebookSidebarVisibility === true)  {
      this.setState({notebookScrollerClass: 'notebooks-scroller slideable', notebookScrollerUnderlayClassname: 'notebooks-scroller slideable underoverlay'});
    }
    else  {
      this.setState({notebookScrollerClass: 'notebooks-scroller slideable slide-hide', notebookScrollerUnderlayClassname: 'notebooks-scroller slideable underoverlay slide-hide'});
    }
  }

  handleDelete(id)  {
    //delete the note, then push
    // code to confirm?
    // handle delete should also be in notes container
    this.props.destroyNotebook(id);
    // .then((action) =>
    //   this.props.history.push('/home/notes/' + `${action.notes.ordered.updated_at_desc[0] ? action.notes.ordered.updated_at_desc[0] : ''}`)
    // expected behavior: if in match path of notebook sidebar view, stay, if in /home/notes/notebooks/:notebookid/notes/:noteid go back to /home/notes/
  }

  handleSubmit(event)  {
    event.preventDefault();
    this.props.createNotebook(this.refs.newnotebookname.value).then((data) => this.handleNewNotebookRedirect(data)).then(() => this.toggleModal()).then(() => this.props.toggleNotebookVisibility(true));
  }

  handleNewNotebookRedirect(action) {
    let newNotebookId = Object.keys(action.notebooks.ordered.created_at_desc[0])[0];
    this.props.history.push(`/home/notebooks/${newNotebookId}/`);
  }

  renderNotebookCards() {
    //
    return(
      this.props.notebooks.ordered['created_at_desc'].map((notebookPair) => ( //data for this should look like {3: [5]}
        <div className = 'notebookdSlideoutCard' key={shortid.generate()} >
          <Button onClick = {() => this.handleDelete(Object.keys(notebookPair)[0])} />
          <Notebook deleteNotebook={() => this.props.destroyNotebook(this.props.notebooks.by_id[Object.keys(notebookPair)[0]].id)}toggle={this.props.toggleNotebookVisibility}notebook={this.props.notebooks.by_id[Object.keys(notebookPair)[0]]} noteCount = {notebookPair[Object.keys(notebookPair)[0]].length}/>
        </div>
      ))
    );
  }

  renderCreateNotebookModal() {
    if (this.state.notebookCreateModal) {
        return (
          <div className = {this.state.notebookCreateModal ? 'notebookCreateModal active' : 'notebookCreateModal'}>
            <div className='notebookCreateModalForm'>
              <div className = 'notebookCreateModalFormHeader'>
                <img src='https://s3-us-west-1.amazonaws.com/neverblank/notebook-small.png'/>
                <h2>CREATE NOTEBOOK</h2>
              </div>
              <div className = 'notebookCreateModalFormHeaderBottom'/>
              <form onSubmit ={this.handleSubmit}>
                <input type="text" ref="newnotebookname" placeholder="Title your notebook"/>
                <div className = 'notebookCreateModalFormButtons'>
                  <Button onClick={() => this.toggleModal()}>Cancel</Button>
                  <Button type="submit">Create Notebook</Button>
                </div>
              </form>
            </div>
          </div>
        );
      }
  }

  toggleModal() {

    this.setState({notebookCreateModal: !this.state.notebookCreateModal});
  }

  render()  {

    //
    //
    //
    return (
      <div>
        {this.renderCreateNotebookModal()}
        <div className = {this.state.notebookScrollerClass}>
          <h2 className = 'notebooksSlider-header'>Notebooks</h2>
          <Button onClick={() => this.toggleModal()}>Create Notebook</Button>
          {this.renderNotebookCards()}
        </div>
        <div onClick={()=> this.props.toggleNotebookVisibility(true)} className = {this.state.notebookScrollerUnderlayClassname} />
      </div>
    );
  }
}

export default Notebooks;
