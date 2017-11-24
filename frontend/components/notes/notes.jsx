import React from 'react';
import Note from './note';
import moment from 'moment';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTES CONSTRUCTOR");
    console.log(props);
  }
  
  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props) {
      console.log('lol');
    }
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
              this.props.notes.map((note) => 
              (
                <li>
                  <ol>
                    <li> {note.title} </li>
                    <li> {moment(note.updated_at).fromNow()} </li>
                    <li> {note.body} </li>
                  </ol>
                </li>
              ))
            }
          </ol>
      </div>
    );
  }
}

export default Notes;

