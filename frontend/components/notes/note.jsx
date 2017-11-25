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
    let timeStamp = moment(note.updated_at).fromNow();
    return (
      <div className = 'note-card noselect'>
        <li className = 'note-card-title'> {note.title} </li>
        <li className = 'note-card-timestamp'> {timeStamp} </li>
        <li className = 'note-card-body'> {note.body} </li>
      </div>
    );
  }
}

export default Note;
