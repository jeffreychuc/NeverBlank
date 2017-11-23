import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import HomeContainer from './home/home_container';
import { SigninContainer, SignupContainer } from './session/session_container';
import EditorContainer from './editor/editor_container';

export default () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/signin" component={SigninContainer}/>
    <Route path="/signup" component={SignupContainer}/>
    <ProtectedRoute path="/editor" component={EditorContainer}/>
  </div>
);
