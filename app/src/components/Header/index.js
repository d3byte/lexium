import React, { Component } from 'react'
import anime from 'animejs'

import './style.css'

import logo from '../../assets/Lexium.png'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: '',
      pathname: '',
      fetching: false,
      searching: false
    }
  }

  componentWillReceiveProps = props => {
    const { fetching } = props
    this.setState({ fetching })
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching })
  }

  componentDidMount = () => {
    const { pathname, fetching } = this.props
    this.setState({ fetching, pathname })
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
    const { className, fetching, searching, pathname } = this.state
    const { inputHandler } = this.props
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
              {
                pathname == '/profile' && (
                  <li className="search" onClick={this.toggleSearch}>
                    <input
                      ref={input => {
                        if (input) {
                          this.input = input
                          input.focus()
                        }
                      }}
                      onBlur={this.toggleSearch}
                      onChange={inputHandler}
                      type="text" className={'line-based ' + (!searching ? 'hide' : '')}
                      placeholder="Название задания"
                    />
                    <i className="material-icons">search</i>
                  </li>
                )
              }
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
