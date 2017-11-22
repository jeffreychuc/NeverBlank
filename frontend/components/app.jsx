import React from 'react';
import { Route } from 'react-router-dom';

import HomeContainer from './home/home_container';
import SigninContainer from './session/signin_container';

export default () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/signin" component={SigninContainer}/>
  </div>
);


