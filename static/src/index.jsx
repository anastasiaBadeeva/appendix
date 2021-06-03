import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import 'callback.html'
import Appendix from './components/DashboardsPage/Appendix'
import MainScreen from './components/MainScreen/MainScreen'
import NoAccess from './components/SigninComponents/NoAccess'
import Callback from './components/SigninComponents/Callback'
import { isLoggedIn, logout, login } from './utils/AuthService'
import SSOSignin from './components/SigninComponents/SSOSignin'

ReactDOM.render(
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          !isLoggedIn() ? (
            <Redirect to="/signin" />
          ) : (
            <Redirect to="/dashboards" />
          )
        }
      />
      <Route path="/signin" component={() => login()} />
      <Route path="/no-access/:appName" component={NoAccess} />
      <Route path="/sso/:appName" component={SSOSignin} />
      <Route path="/callback" component={Callback} />
      <Route
        exact
        path="/logout"
        render={() => {
          logout()
          return <Redirect to="/signin" />
        }}
      />
      <Route
        exact
        path="/appendix"
        component={Appendix}
      />
      <Route
        exact
        path="/home"
        render={() => <MainScreen isLogged={isLoggedIn()} type="home" />}
      />
      <Route
        exact
        path="/dashboards"
        render={() =>
          !isLoggedIn() ? (
            <Redirect to="/signin" />
          ) : (
            <MainScreen isLogged={isLoggedIn()} type="dashboards" />
          )
        }
      />
      <Route
        exact
        path="/reports"
        render={() => <MainScreen isLogged={isLoggedIn()} type="reports" />}
      />
      <Route
        exact
        path="/datasets"
        render={() => <MainScreen isLogged={isLoggedIn()} type="datasets" />}
      />
      <Route
        exact
        path="/profile"
        render={() => <MainScreen isLogged={isLoggedIn()} type="profile" />}
      />
      <Route
        render={() => <MainScreen isLogged={isLoggedIn()} type="empty" />}
      />
    </Switch>
  </Router>,
  document.getElementById('app')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/MainScreen/MainScreen', () => {
    const NextApp = <MainScreen isLogged={isLoggedIn()} type="home" />
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
