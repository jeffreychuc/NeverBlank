import React from 'react';
import { smallLogo } from '../assets';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavSidebar extends React.Component  {
  constructor(props)  {
    super(props);
    this.topButtonGroup = this.topButtonGroup.bind(this);
    this.bottomButtonGroup = this.bottomButtonGroup.bind(this);
    this.handleNoteButton = this.handleNoteButton.bind(this);
    this.profileButton = this.profileButton.bind(this);
  }

  topButtonGroup()  {
    let redirect;
    if ('notebookId' in this.props.match.params)  {
      redirect = `/home/notebooks/${this.props.match.params.notebookId}/notes/new`;
    }
    else  {
      redirect = '/home/notes/new/';
    }
    return (
      <div className = 'topButtonGroup'>
        <Button className='newNoteButton' onClick={() => this.props.history.push(redirect)} block>Add New Note</Button>
      </div>
    );
  }

  handleNoteButton()  {
    let redirect;
    if (this.props.notebookSidebarVisibility) {
      this.props.toggleNotebookVisibility(this.props.notebookSidebarVisibility);
    }
    redirect = `/home/notes/${this.props.latestUpdatedNote ? this.props.latestUpdatedNote : ''}`;
    this.props.history.push(redirect);
  }

  bottomButtonGroup() {

    return (
      <div className = 'middleButtonGroup'>
        <a className='tags-nav-button noselect' onClick={() => this.props.setTagSidebarVisibility(!this.props.tagSlider)}>Tags</a>
        <a className='notebooks-nav-button noselect' onClick={() => this.props.toggleNotebookVisibility(this.props.notebookSidebarVisibility)}>Notebooks</a>
        <Button className='notesButton' onClick={() => this.handleNoteButton()}>Notes</Button>
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

// {/* <NavLink strict className='newNoteButton noselect' to={this.props.notebookSidebarVisibility ? '/home/notes/' : '#'} >Notes</NavLink> */}
