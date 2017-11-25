import React from 'react';
import Drawer from 'react-motion-drawer';
import { Button } from 'react-bootstrap';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';

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
        <NavSidebarContainer />
        <div className = 'notes-sidebar'>
          <NotesContainer id={2} />
        </div>
        <Button className='logout' onClick={() => this.handleLogout()} block>Logout</Button>
      </div>
    );
  }
}

export default Editor;

// {/* <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button> */}
