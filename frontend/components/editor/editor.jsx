import React from 'react';
import { Button } from 'react-bootstrap';
import NotesContainer from '../notes/notes_container';

class Editor extends React.Component  {
  constructor (props)  {
    super(props);
  }

  handleLogout () {
    this.props.logout().then(() => this.props.history.push('/'));
  }

  render()  {
    return (
      <div className = 'editor-main'>
        <div className = 'nav-sidebar'>
          <img src='https://imgur.com/GTBvCdV.png' />
        </div>
        <div className = 'notes-sidebar'>
          <NotesContainer />
        </div>
        <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button>
      </div>
    );
  }
}

export default Editor;
