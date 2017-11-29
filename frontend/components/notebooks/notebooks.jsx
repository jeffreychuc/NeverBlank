import React from 'react';
import Notebook from './notebook';
import shortid from 'shortid';
import { Button } from 'react-bootstrap';
import { createSlideToggle } from '../../util/css_util';

class Notebooks extends React.Component  {
  constructor (props)  {
    super(props);
    // console.log("IN NOTES CONSTRUCTOR");
    // console.log(props);
    const boundSlideToggle = createSlideToggle.bind(this);
    this.notebookScrollerToggle = boundSlideToggle('notesScrollerClass', 'notes-scroller').bind(this);
    // console.log('in notes constructor');
  }

  componentWillReceiveProps(newProps) {
   console.log('notes getting new props');
  //  debugger;

  }

  handleDelete(id)  {
    //delete the note, then push
    this.props.destroyNotebook(id);
    // .then((action) =>
    //   this.props.history.push('/home/notes/' + `${action.notes.ordered.updated_at_desc[0] ? action.notes.ordered.updated_at_desc[0] : ''}`)
    // expected behavior: if in match path of notebook sidebar view, stay, if in /home/notes/notebooks/:notebookid/notes/:noteid go back to /home/notes/
  }


  renderNotebookCards() {
    debugger;
    return(
      this.props.notebooks.ordered['created_at_desc'].map((notebookPair) => ( //data for this should look like {3: [5]}
        <div key={shortid.generate()} >
          <Button onClick = {() => this.handleDelete(Object.keys(notebookPair)[0])} />
          <Notebook notebook={this.props.notebooks.by_id[Object.keys(notebookPair)[0]]} noteCount = {notebookPair[Object.keys(notebookPair)[0]].length}/>
        </div>
      ))
    );
  }

  debug() {
    debugger;
  }
  render()  {
    console.log('in notebooks render');
    // console.log(this.props.selected, 'THIS SHOULD BE A BOOL');
    // console.log(this.props);
    // debugger;
    return (
      <div className = 'notebooksSlider'>
        IT RENDERS
        <h2 className = 'notebooksSlider-header'>Notebooks</h2>
        <Button onClick ={()=>this.props.createNotebook()}>Create a Notebook</Button>
        {this.renderNotebookCards()}
      </div>
    );
  }
}

export default Notebooks;
