import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }


  render()  {
    return (
      <div className = 'main-view'>
        <NavSidebarContainer />
        <div className = 'notes-sidebar'>
          <NotesContainer id={2} />
        </div>
        
      </div>
    );
  }
}

export default Home;

// {/* <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button> */}
