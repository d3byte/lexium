import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

// Pages
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Main from './pages/Main.jsx'

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
      </Router>
    )
  }
}

export default App
