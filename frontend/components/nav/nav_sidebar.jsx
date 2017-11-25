import React from 'react';
import { smallLogo } from '../assets';

class NavSidebar extends React.Component  {
  constructor(props)  {
    super(props);
  }

  topButtonGroup()  {
    return (
      <div className = 'topButtonGroup'>
      </div>
    );
  }

  bottomButtonGroup() {
    return (
      <div className = 'bottomButtonGroup'>
      </div>
    );
  }

  profileButton() {
    return (
      <div className = 'profileButton'>
      </div>
    );
  }
  render  ()  {
    return (
      <div className = 'nav-sidebar'>
        <div className = 'nav-logo'>
          <img className='smallLogo' src='https://s3-us-west-1.amazonaws.com/neverblank/smallLogo.png' />
          {this.topButtonGroup()}
          {this.bottomButtonGroup()}
          {this.profileButton()}
        </div> 
      </div> 
    );
  }
}

export default NavSidebar;
