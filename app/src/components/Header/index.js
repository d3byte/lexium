import React, { Component } from 'react'

import './style.css'

import logo from '../../assets/Lexium.png'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: '',
      fetching: false
    }
  }

  componentWillReceiveProps = props => {
    const { fetching } = props
    this.setState({ fetching })
  }

  componentDidMount = () => {
    const { pathname, fetching } = this.props
    this.setState({ fetching })
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
    const { className, fetching } = this.state
    return (
      <header className={className}>
        <img className="logo" src={logo} alt="logo"/>
        {
          className === 'isLoggedIn' && (
            <ul className="navigation">
              {
                fetching && (
                  <li className="fetch">
                    <i className="material-icons">loop</i>
                  </li>
                )
              }
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
