import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, ProtectedRouteExact } from '../util/route_util';

import LandingContainer from './landing/landing_container';
import { SigninContainer, SignupContainer } from './session/session_container';
import HomeContainer from './home/home_container';
import NotesContainer from './notes/notes_container';
import EditorContainer from './editor/editor_container';

export default () => (
  <div>
    <Route exact path="/" component={LandingContainer} />
    <AuthRoute exact path="/signin" component={SigninContainer}/>
    <AuthRoute exact path="/signup" component={SignupContainer}/>
    <Switch>
      <ProtectedRoute path="/home/notes/:noteId" component={HomeContainer}/>
      <ProtectedRoute path="/home/notes/" component={HomeContainer}/>
      <ProtectedRoute path="/home/notebooks/:notebookId/notes/:noteId" component={HomeContainer}/>
      <ProtectedRoute path="/home/notebooks/:notebookId/notes" component={HomeContainer}/>
      <ProtectedRoute path="/home/notebooks/:notebookId" component={HomeContainer}/>
      <ProtectedRoute path="/home/notebooks/" component={HomeContainer}/>
      <ProtectedRoute path="/home/" component={HomeContainer}/>
    </Switch>
  </div>
);

// {/* <ProtectedRoute path="/home/notes/" component={HomeContainer}/>

