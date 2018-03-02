import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

// Pages
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Error404 from './pages/Error404'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/404" component={Error404} />
          </Switch>
      </Router>
    )
  }
}

export default App
