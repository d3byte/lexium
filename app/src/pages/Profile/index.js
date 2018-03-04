import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils/index'

import './style.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      level: '',
      currentGroup: {}
    }
    this.cache = new CacheManager()
    this.token = ''
  }

  determineUserLevel = () => {
    const { wordsLearnt } = this.state.user
    let level = ''
    if (wordsLearnt)
    return level
  }

  callGroupList = () => {
    // Вызвать модал со списком групп
  }

  componentDidMount = async () => {
    const { client, user, token } = this.props
    if (!user || !token) {
      try {
        const cachedUser = await this.cache.readData('user')
        const currentGroup = await this.cache.readData('currentGroup')
        this.token = await this.cache.readData('token')
        this.setState({ user: cachedUser, currentGroup })
      } catch (error) {
        console.log(error)
        this.props.history.push('/signin')
      }
    } else {
      this.setState({ user, currentGroup: user.groups[0] })
      this.token = token
    }
  }
  
  

  render() {
    const { user, currentGroup, level } = this.state
    console.log(user, currentGroup, level)
    return (
      <div className="profile">
        <Header pathname={this.props.location.pathname} />

        <div className="section">
          <span className="title">Информация</span>
          <div className="containers">

            <div className="container of-info">
              <div className="avatar">
                <img src={user.avatarUrl} alt="avatar"/>
              </div>
              <div className="container-main">
                <div className="info equal-space">
                  <div className="name">
                    <span className="right-lined">{user.name}</span>
                    <span className="username">{user.username}</span>
                  </div>
                  <p>Знание языка: <b>{level}</b></p>
                  <p>Изучено слов: <b>{user.wordsLearnt}</b></p>
                </div>
                <div className="naming"></div>
              </div>
            </div>

            <div className="container of-info reverse">
              <div className="avatar">
                <img src={currentGroup.avatarUrl} alt="group-avatar" />
              </div>
              <div className="container-main">
                <div className="info">
                  <div className="name">
                    {/* <span>{currentGroup.name}</span> */}
                    <span>Длинное название группы пиздец</span>
                  </div>
                  <p className="bigger">Участников: <b>{currentGroup.users && currentGroup.users.length}</b></p>
                  <Link
                    className="lighten"
                    to={{ pathname: '/group', state: { group: currentGroup } }}>
                    Посмотреть подробную информацию
                  </Link>
                  <p className="lighten hover" onClick={this.callGroupList}>Сменить группу</p>
                </div>
                <div className="naming">
                  Выбранная группа
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withApollo(Profile)
