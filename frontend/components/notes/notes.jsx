import React from 'react';
import Note from './note';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTES CONSTRUCTOR");
    console.log(props);
    this.fetchNotes = props.fetchNotes;
  }

  componentDidMount() {
    this.fetchNotes();
  }

  render()  {
    return (
      <div>
        <h2> Notes Container </h2>
        <Note />
      </div>
    );
  }
}

export default Notes;
