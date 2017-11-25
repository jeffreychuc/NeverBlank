import React from 'react';
import { smallLogo } from '../assets';

class NavSidebar extends React.Component  {
  constructor(props)  {
    super(props);
  }

  render  ()  {
    return (
      <div className = 'nav-sidebar'>
        <img src='https://s3-us-west-1.amazonaws.com/neverblank/smallLogo.png' />
      </div> 
    );
  }
}

export default NavSidebar;
