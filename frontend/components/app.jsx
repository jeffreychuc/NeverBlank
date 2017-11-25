import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import LandingContainer from './landing/landing_container';
import { SigninContainer, SignupContainer } from './session/session_container';
import HomeContainer from './home/home_container';
import EditorContainer from './editor/editor_container';

export default () => (
  <div>
    <Route exact path="/" component={LandingContainer} />
    <AuthRoute path="/signin" component={SigninContainer}/>
    <AuthRoute path="/signup" component={SignupContainer}/>
    <ProtectedRoute path="/home" component={HomeContainer}/>
  </div>
);
