import React from 'react';
import Note from './note';
import shortid from 'shortid';

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
    return (
      <div>
        <h2> Notes Container </h2>
          <ol>
            {
              this.props.notes.map((note) => (
                <Note key={shortid.generate()} note = {note}/>
              ))
            }
          </ol>
      </div>
    );
  }
}

export default Notes;

