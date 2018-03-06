import React, { Component } from 'react'
import anime from 'animejs'
import { Link } from 'react-router-dom'

import './style.css'

import logo from '../../assets/Lexium.png'

import { CacheManager } from '../../utils/index'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: '',
      pathname: '',
      fetching: false,
      searching: false,
      menuIsActive: false
    }
    this.cache = new CacheManager()
  }

  componentWillReceiveProps = props => {
    const { fetching } = props
    this.setState({ fetching })
  }

  toggleSearch = () => {
    this.setState({ searching: !this.state.searching })
  }

  hideMenu = () => {
    const animation = anime({
      targets: `.dropdown`,
      top: { value: 45, duration: 500 },
      opacity: { value: 0, duration: 500 }
    })
    animation.finished.then(() => this.setState({ menuIsActive: false }))
  }

  toggleMenu = () => {
    const { menuIsActive } = this.state
    if (!menuIsActive) {
      this.setState({ menuIsActive: true })
      anime({
        targets: `.dropdown`,
        top: { value: 55, duration: 1000 },
        opacity: { value: 1, duration: 500 }
      })
    } else {
      this.hideMenu()
    }
  }

  logout = () => {
    const { history } = this.props
    this.cache.clear()
    history.push('/signin')
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
    const { className, fetching, searching, pathname, menuIsActive } = this.state
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
              <li onClick={this.toggleMenu}>
                <i className="material-icons">reorder</i>
              </li>
            </ul>
          )
        }
        <div className={'dropdown menu rounded ' + (menuIsActive ? '' : 'hide')}>
          <div className="dropdown-header">Меню</div>
          <ul className="dropdown-menu">
            <li>
              <Link to="/profile">
                <i class="material-icons">account_circle</i> Профиль
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i class="material-icons">settings</i> Настройки
              </Link>
            </li>
            <li className="divider" onClick={this.logout}>
              <i class="material-icons">exit_to_app</i> Выход
            </li>
          </ul>
        </div>
      </header>
    )
  }
}
