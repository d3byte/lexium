import React, { Component } from 'react'

import logo from '../../assets/Lexium.png'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: ''
    }
  }

  componentDidMount = () => {
    // TODO: Переделать на реакторский лад
    // const route = this.$route.path
    // switch (route) {
    //   case '/signin':
    //   case '/signup':
    //     this.className = 'isNotLoggedIn'
    //     this.route = route
    //     break
    //   default:
    //     this.className = 'isLoggedIn'
    //     this.route = route
    // }
  }
  

  render() {
    const { className } = this.state
    return (
      <header className={className}>
        <img className="logo" src={logo} alt="logo"/>
        <ul v-if="className == 'isLoggedIn'" className="navigation">
            <li className="search">
                <i className="material-icons">search</i>
            </li>
            <li className="notifications">
                <i className="material-icons">bookmark</i>
            </li>
            <li>
                <i className="material-icons">reorder</i>
            </li>
        </ul>
    </header>
    )
  }
}
