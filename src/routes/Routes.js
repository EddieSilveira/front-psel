import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

function CustomRoute({ isPrivate, ...rest }) {
  const { authenticated } = useContext(AuthContext);

  if (isPrivate && !authenticated) {
    return <Redirect to="/signin" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={SignIn} />
      <CustomRoute exact path="/signin" component={SignIn} />
      <CustomRoute exact path="/signup" component={SignUp} />
      <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
