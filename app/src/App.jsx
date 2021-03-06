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
import Profile from './pages/Profile'
import Group from './pages/Group'
import Task from './pages/Task'
import FlashCards from './pages/FlashCards'
import FindPair from './pages/FindPair'
import Typein from './pages/Typein'
import Settings from './pages/Settings'
import Scramble from './pages/Scramble'
import Test from './pages/Test'

export default class App extends Component {
  componentWillReceiveProps = props => {
    console.log(props)
  }

  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/group/:id" component={Group} />
            <Route exact path="/task" component={Task} />
            <Route exact path="/task/learn" component={FlashCards} />
            <Route exact path="/task/find" component={FindPair} />
            <Route exact path="/task/typein" component={Typein} />
            <Route exact path="/task/scramble" component={Scramble} />
            <Route exact path="/task/test" component={Test} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="*" component={Error404} />
          </Switch>
      </Router>
    )
  }
}

