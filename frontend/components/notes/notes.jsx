import React from 'react';
import Note from './note';
import shortid from 'shortid';
import pluralize from 'pluralize';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTES CONSTRUCTOR");
    console.log(props);
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  render()  {
    console.log('in render');
    console.log(this.props);
    if (!this.props.notes)  {
      return null;
    }
    let noteCount = this.props.notes.length;
    return (
      <div className ='notes-scroller'>
        <div className = 'notes-header'>
          <h2 className = 'notes-header-text'>NOTES</h2>
        </div>
        <div className = 'notes-subheader'>
          <p className = 'notes-count'>{noteCount} {pluralize('note', noteCount)}</p>
        </div>
        <div className = 'notes-background'>
          <div className = 'notes-view'>
            <div className = 'notes-container'>
              <ol>
                {
                  this.props.notes.map((note) => (
                    <Note key={shortid.generate()} note = {note}/>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
