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

  }

  renderNotebookCards() {
    return(
      this.props.notebooks.ordered.created_at_desc.map((id) => (
        <div key={shortid.generate()} >
          <Button onClick = {() => this.handleDelete(id)} />
          <Notebook notebook={this.props.notebooks.by_id[id]}/>
        </div>
      ))
    );
  }

  render()  {
    console.log('in notebooks render');
    // console.log(this.props.selected, 'THIS SHOULD BE A BOOL');
    // console.log(this.props);
    if (!this.props.notebooks)  {
      return null;
    }
    // debugger;
    return (
      <div className = 'notebooksSlider'>
        IT RENDERS
        {this.renderNotebookCards()}
      </div>
    );
  }
}

export default Notebooks;
