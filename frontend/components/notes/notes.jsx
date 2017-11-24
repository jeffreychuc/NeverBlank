import React from 'react';
import Note from './note';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTES CONSTRUCTOR");
    console.log(props);
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
