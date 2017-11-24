import React from 'react';
import moment from 'moment';

class Note extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTE CONSTRUCTOR");
    console.log(props);
  }

  render()  {
    console.log('in render for single note');
    console.log(this.props);
    const { note } = this.props;
    return (
      <div>
        <li> {note.title} </li>
        <li> {moment(note.updated_at).fromNow()} </li>
        <li> {note.body} </li>
      </div>
    );
  }
}

export default Note;
