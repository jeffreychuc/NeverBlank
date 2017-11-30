import React from 'react';
import { smallLogo } from '../assets';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavSidebar extends React.Component  {
  constructor(props)  {
    super(props);
    this.topButtonGroup = this.topButtonGroup.bind(this);
    this.bottomButtonGroup = this.bottomButtonGroup.bind(this);
    this.profileButton = this.profileButton.bind(this);
  }

  topButtonGroup()  {
    return (
      <div className = 'topButtonGroup'>
        <Button className='newNoteButton' onClick={() => this.props.history.push('/home/notes/new/')} block>Add New Note</Button>
      </div>
    );
  }

  bottomButtonGroup() {
    return (
      <div className = 'middleButtonGroup'>
        <a className='notebooks-nav-button noselect' onClick={() => this.props.toggleNotebookVisibility(this.props.notebookSidebarVisibility)}>Notebooks</a>
        <NavLink strict className='newNoteButton noselect' to={'/home/notes/'} >Notes</NavLink>
      </div>
    );
  }

  profileButton() {
    return (
      <div className = 'profileButton'>
        <Button className='logout' onClick={() => this.handleLogout()} block>Logout</Button>
      </div>
    );
  }

  handleLogout () {
    this.props.logout().then(() => this.props.history.push('/'));
  }

  render  ()  {
    return (
      <div className = 'nav-sidebar'>
        <div className = 'nav-logo'>
          <img className='smallLogo' src='https://s3-us-west-1.amazonaws.com/neverblank/smallLogo.png' />
        </div>
        {this.topButtonGroup()}
        {this.bottomButtonGroup()}
        {this.profileButton()}
      </div>
    );
  }
}

export default NavSidebar;
