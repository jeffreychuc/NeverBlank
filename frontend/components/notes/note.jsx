import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Note extends React.Component  {
  constructor (props)  {
    super(props);
    console.log(this.props);
  }

  render()  {
    const { note } = this.props;
    let timeStamp = moment(note.updated_at).fromNow();
    return (
      <NavLink to={`/home/notes/${note.id}`}>
        <div className = 'note-select'>
          <div className = 'note-card noselect'>
            <li className = 'note-card-title'> {note.title} </li>
            <li className = 'note-card-timestamp'> {timeStamp} </li>
            <li className = 'note-card-body'> {note.bodypreview} </li>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default Note;
