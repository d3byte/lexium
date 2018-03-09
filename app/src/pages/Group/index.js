import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'

import './style.css'

class Group extends Component {
  constructor() {
    super()
    this.state = {
      showHelp: false,
      showEdit: null
    }
    this.client = {}
    this.cache = new CacheManager()
    this.token = ''
  }

  fetchData = async(token, groupId) => {
    const { location } = this.props
    const response = await this.client.query({ query: GROUP, variables: { token, id: groupId } })
    let { group, error } = response.data
    if (error && error.length > 0) { this.props.history.push('/profile') }
    group.superUsers = JSON.parse(group.superUsers)
    this.setState({ group, fetching: false })
  }

  toggleHelp = () => {
    this.setState({ showHelp: !this.state.showHelp })
  }

  toggleEdit = taskId => {
    const {showEdit} = this.state
    if (showEdit) {
      this.setState({ showEdit: false, highlighted: null })
      return
    }
    this.setState({ showEdit: true, highlighted: taskId })
  }

  componentDidMount = async () => {
    const { client, match, location } = this.props
    const { id } = match.params
    let group, user, token
    if (location.state) { 
      group = location.state.group
      user = location.state.user
      token = location.state.token
    }
    this.client = client
    if (group == undefined || user == undefined || token == undefined) {
      try {
        const cachedUser = await this.cache.readData('user')
        const token = await this.cache.readData('token')
        const cachedGroup = cachedUser.groups.map(group => {
          let isValid = false
          if (group.id === id) {
            group.users.map(user => {
              if (user.id == cachedUser.id) {
                isValid = true
              }
            })
          }
          if (isValid) {
            return group
          }
        })[0]
        if (cachedGroup == undefined) {
          this.props.history.push('/profile')
        }
        this.token = token
        this.setState({ user: cachedUser, group: cachedGroup, fetching: true })
        this.fetchData(token, id)
      } catch (error) {
        console.log(error)
        this.props.history.push('/signin')
      }
    } else {
      this.setState({ user, group })
      this.token = token
    }
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { fetching, showHelp, showEdit, highlighted, user, group } = this.state
    return (
      <div> 
        <Header fetching={fetching} pathname={pathname} history={history} inputHandler={this.searchTasks}/>

        <div className="section info">
          <div className="titles">
            <span className="title">Информация</span>
            <span className="title">Управление группой</span>
          </div>

          <div className="containers">

            <div className="container of-info">
              <div className="avatar">
                <img src={group ? group.avatarUrl : ''} alt="avatar"/>
              </div>
              <div className="container-main">
                <div className="info equal-space">
                  <div className="name">
                    <span className="">{group ? group.name: ''}</span>
                  </div>
                  <p className="bigger">
                    Участников: <b>{group && group.users ? group.users.length : ''}</b>
                  </p>
                  <p className="lighten hover">Покинуть группу</p>
                </div>
              </div>
            </div>

            <div className="container of-info">
              <div className="container-main menu">
                <div className="menu-item">Новое задание</div>
                <div className="menu-item">Все задания</div>
                <div className="menu-item">Добавить участника</div>
                <div className="menu-item">Все участники</div>
              </div>
            </div>

          </div>
        </div>

        <div className="section tasks">
          <div className="titles">
            <span className="title with-icon">Список заданий
              <i
                className="material-icons"
                onClick={this.toggleHelp}
                onBlur={this.toggleHelp}>help_outline</i>
            </span>
            <span className="title">Редактор слов</span>
          </div>

          <div className="single-line">
            <div className="containers task-list">
              { 
                showHelp && (
                  <div className="container of-help">
                    <p>Выберите задание, кликнув по нему.</p>
                    <p>Измените название задания, нажав на него и
                    </p>
                    <p>введя новое. Отредактируйте пары слов, воспользовавшись редактором.</p>
                  </div>
                )
              }
              <div
                className={ 'container of-task' + (highlighted == 1? ' highlighted': '') } onClick={() => this.toggleEdit(1)}>
                <div className="info">
                  <p className="name">Любителям бананидзе посвящидзе</p>
                  <p className="task-info">Пар слов:
                    <b>
                      2</b>
                  </p>
                  <p className="task-info">Пройдено раз:
                    <b>
                      3</b>
                  </p>
                </div>
                <p className="lightest">Создано: 08.03.2018</p>
              </div>
            </div>

            <div className="containers edit-block">
              {
                showEdit && (
                  <div className="container of-edit">
                    <p>джю</p>
                  </div>
                )
              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default withApollo(Group)