import React from 'react';
import Note from './note';
import shortid from 'shortid';
import pluralize from 'pluralize';
import { createSlideToggle } from '../../util/css_util'; 

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTES CONSTRUCTOR");
    console.log(props);
    const boundSlideToggle = createSlideToggle.bind(this);
    this.noteScrollerToggle = boundSlideToggle('notesScrollerClass', 'notes-scroller').bind(this);
    // this.setActive = this.props.currentNoteID;
    console.log('in notes constructor');
    debugger;
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    // this.props.fetchNotes().then(() => this.setActive(this.props.notes[0].id)).then(() => this.noteScrollerToggle());
    this.noteScrollerToggle();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected)  {
      return null;
    }
    debugger;
  }

  render()  {
    console.log('in render');
    console.log(this.props.selected, 'THIS SHOULD BE A BOOL');
    console.log(this.props);
    if (!this.props.notes)  {
      return null;
    }
    let noteCount = this.props.notes.length;
    return (
      <div className ={this.state.notesScrollerClass}>
        <div className = 'notes-header'>
          <h2 className = 'notes-header-text'>NOTES</h2>
        </div>
        <div className = 'notes-subheader'>
          <p className = 'notes-count'>{noteCount} {pluralize('note', noteCount)}</p>
        </div>
        <div className = 'notes-height-wrapper'>
          <div className = 'notes-background'>
            <div className = 'notes-view'>
              <div className = 'notes-container'>
                <ol>
                  {
                    this.props.notes.map((note) => (
                      <Note key={shortid.generate()} note={note}/>
                    ))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
