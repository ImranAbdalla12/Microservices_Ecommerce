
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from 'WithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import LinearDeterminate from './views/Loading/Loading';
//Using Lazy Load
const IndexView = React.lazy(() => import('./views/IndexView'));
const Register = React.lazy(() => import('./views/SignupSimple'));
const NotFound = React.lazy(() => import('./views/NotFound'));
const Login = React.lazy(() => import('./views/SigninSimple'));
const Account = React.lazy(() => import('./views/Account'));
const PasswordRest = React.lazy(() => import('./views/PasswordResetSimple'));
const About = React.lazy(() => import('./views/AboutSideCover'));
const Contact = React.lazy(() => import('./views/ContactPageCover'));
const Routes = () => {
  return (
    <React.Suspense
      fallback={
        <div>
          <LinearDeterminate />
        </div>
      }
    >
      <Switch>
        <Route
          exact
          path="/"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={IndexView}
              layout={MainLayout}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={Register}
              layout={MainLayout}
            />
          )}
        />
        <Route
          exact
          path="/account"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={Account}
              layout={MainLayout}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={matchProps => (
            <WithLayout {...matchProps} component={Login} layout={MainLayout} />
          )}
        />
        <Route
          exact
          path="/password_reset"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={PasswordRest}
              layout={MainLayout}
            />
          )}
        />
        <Route
          exact
          path="/not-found"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={NotFound}
              layout={MinimalLayout}
            />
          )}
        />
        <Route
          exact
          path="/about"
          render={matchProps => (
            <WithLayout {...matchProps} component={About} layout={MainLayout} />
          )}
        />
        <Route
          exact
          path="/contact"
          render={matchProps => (
            <WithLayout
              {...matchProps}
              component={Contact}
              layout={MainLayout}
            />
          )}
        />

        <Redirect to="/not-found" />
      </Switch>
    </React.Suspense>
  );
};

export default Routes;
