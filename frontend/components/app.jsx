import React from 'react';
import { Route } from 'react-router-dom';

import HomeContainer from './home/home_container';
import SigninContainer from './session/signin_container';
import EditorContainer from './editor/editor_container';

export default () => (
  <div>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/signin" component={SigninContainer}/>
    <Route path="/editor" component={EditorContainer}/>
  </div>
);


