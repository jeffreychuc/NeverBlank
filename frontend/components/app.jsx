import React from 'react';
import { Route } from 'react-router-dom';

import HomeContainer from './home/home_container';
import SignupContainer from './session/signup_container';

export default () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/signup" component={SignupContainer}/>
  </div>
);


