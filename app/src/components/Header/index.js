import React, { Component } from 'react'
import anime from 'animejs'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Button from '../Button'

import './style.css'

import logo from '../../assets/Lexium.png'

import { CREATE_GROUP } from '../../graphql/mutations'
import { CacheManager } from '../../utils/index'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      className: '',
      pathname: '',
      fetching: false,
      searching: false,
      menuIsActive: false,
      isGroupCreationActive: false,
      groupName: ''
    }
    this.cache = new CacheManager()
    this.screenWidth = window.screen.innerWidth || document.clientWidth || document.body.clientWidth
  }

  componentWillReceiveProps = props => {
    const { fetching } = props
    this.setState({ fetching })
  }

  toggleGroupCreation = () => {
    this.setState({ isGroupCreationActive: !this.state.isGroupCreationActive })
  }

  createGroup = async () => {
    const { groupName } = this.state
    const user = await this.cache.readData('user')
    const response = await this.props.createGroup({ variables: { name: groupName, superUsers: [user.id] } })
    const group = response.data.createGroup
    console.log(response, group)
    this.cache.writeData('user', { ...user, groups: [...user.groups, group] })
    this.setState({ isGroupCreationActive: false })
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

  showSidebar = () => {
    anime({
      targets: `.sidebar`,
      right: { value: 0, duration: 350 },
      easing: 'linear'
    })
    document.getElementById('root').classList.add('no-scroll')
  }

  hideSidebar = () => {
    const animation = anime({
      targets: `.sidebar`,
      right: { value: '-450', duration: 350 },
      easing: 'linear'
    })
    animation.finished.then(() => this.setState({ menuIsActive: false }))
    document.getElementById('root').classList.remove('no-scroll')
  }

  toggleMenu = () => {
    const { menuIsActive } = this.state
    if (!menuIsActive) {
      this.setState({ menuIsActive: true })
      this.screenWidth > 450 ?
        anime({
          targets: `.dropdown`,
          top: { value: 55, duration: 1000 },
          opacity: { value: 1, duration: 500 }
        }) : 
        this.showSidebar()
    } else {
      this.screenWidth > 450 ?
        this.hideMenu() :
        this.hideSidebar()
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
    const { className, fetching, searching, pathname, menuIsActive, isGroupCreationActive } = this.state
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
              {/* <li className="notifications">
                <i className="material-icons">bookmark</i>
              </li> */}
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
                <i className="material-icons">account_circle</i> Профиль
              </Link>
            </li>
            <li onClick={this.toggleGroupCreation}>
              <i className="material-icons">add_box</i> Создать группу
            </li>
            <li>
              <Link to="/settings">
                <i className="material-icons">settings</i> Настройки
              </Link>
            </li>
            <li className="divider" onClick={this.logout}>
              <i className="material-icons">exit_to_app</i> Выход
            </li>
          </ul>
        </div>
        <div className={'sidebar ' + (menuIsActive ? '' : 'hide')} style={{ right: '-450px' }}>
          <span className="sidebar-header" onClick={this.toggleMenu}>
            <i className="material-icons">arrow_back</i> Меню
          </span>
          <ul className="sidebar-menu">
            <li>
              <Link to="/profile">
                <i className="material-icons">account_circle</i> Профиль
              </Link>
            </li>
            <li className="create-group">
              <span onClick={this.toggleGroupCreation}>
                <i className="material-icons">add_box</i> Создать группу
              </span>
              <div className={'group-creation mobile ' + (isGroupCreationActive ? '' : 'hide')}>
                <input placeholder="Имя группы" className="line-based" onChange={e => this.setState({ groupName: e.target.value })} />
                <button onClick={this.createGroup} className="flat text-blue">Создать</button>
              </div>
            </li>
            <li>
              <Link to="/settings">
                <i className="material-icons">settings</i> Настройки
              </Link>
            </li>
          </ul>
          <Button clickHandler={this.logout} classNameProp="regular" text="Выход" />
        </div>
        <div className={'sidebar-overlay ' + (menuIsActive ? '' : 'hide')} onClick={this.toggleMenu}></div>
        <div className={'group-creation desktop ' + (isGroupCreationActive ? '' : 'hide')}>
          <input placeholder="Имя группы" className="line-based" onChange={e => this.setState({ groupName: e.target.value })} />
          <button className="flat text-blue" onClick={this.createGroup}>Создать</button>
          <i onClick={this.toggleGroupCreation} className="material-icons">close</i>
        </div>
      </header>
    )
  }
}

export default graphql(CREATE_GROUP, { name: 'createGroup' })(Header)