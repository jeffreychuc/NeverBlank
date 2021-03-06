import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => {
    if (!loggedIn)  {
      return (<Component {...props} />);
    }
    else  {
      return (<Redirect to="/home/notes" />);
    }
  }} />
);

const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => {
    if (loggedIn)  {
      return (<Component {...props} />);
    }
    else  {
      return (<Redirect to="/signin" />);
    }
  }} />
);

const ProtectedExact = ({ component: Component, path, loggedIn }) => (
  <Route excat path={path} render={(props) => {
    if (loggedIn)  {
      return (<Component {...props} />);
    }
    else  {
      return (<Redirect to="/signin" />);
    }
  }} />
);

const mapStateToProps = state => (
  {loggedIn: Boolean(state.session.currentUser)}
);

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const ProtectedRouteExact = withRouter(connect(mapStateToProps, null)(ProtectedExact));
