import React, { Component } from 'react'

import './style.css'

import logo from '../../assets/Lexium.png'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: ''
    }
  }

  componentDidMount = () => {
    const { pathname } = this.props
    switch (pathname) {
      case '/signin':
      case '/signup':
        this.setState({ className: 'isNotLoggedIn' })
        break
      default:
        this.setState({ className: 'isLoggedIn' })
    }
  }
  

  render() {
    const { className } = this.state
    return (
      <header className={className}>
        <img className="logo" src={logo} alt="logo"/>
        {
          className === 'isLoggedIn' && (
            <ul className="navigation">
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
          )
        }
      </header>
    )
  }
}
