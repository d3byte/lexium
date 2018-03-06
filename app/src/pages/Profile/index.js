import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils/index'
import { USER } from '../../graphql/queries'

import './style.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      currentGroup: {},
      level: '',
      query: [],
      showCompleted: false,
      fetching: false
    }
    this.cache = new CacheManager()
    this.client = {}
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

  toggleCompletedTasks = () => {
    this.setState({ showCompleted: !this.state.showCompleted })
  }

  splitTasks = (tasks, userId) => {
    let uncompletedTasks = [], completedTasks = []
    tasks.map(task => {
      if (task.results) {
        let isDone = false
        task.results.map(result => {
          if (result.user.id === userId) {
            isDone = true
          }
          return result
        })
        if (!isDone) {
          uncompletedTasks.push(task)
        } else {
          completedTasks.push(task)
        }
      }
      return task
    })
    return { uncompletedTasks, completedTasks }
  }

  splitDate = date => {
    return {
      year: date.slice(0, 4),
      month: date.slice(5, 7),
      day: date.slice(8, 10),
      time: {
        hours: date.slice(11, 13),
        minutes: date.slice(14, 16),
        seconds: date.slice(17, 19),
      },
    }
  }

  determineRemainingDays = task => {
    const deadline = this.splitDate(task.deadline).day,
      today = new Date().getDate,
      difference = deadline - today
    if (difference < 0) {
      return 'время вышло'
    }
    return difference
  }

  getUserResult = task => {
    const { id } = this.state.user
    const result = task.results.filter(result => result.user.id === id)[0]
    return result
  }

  searchTasks = e => {
    const { currentGroup, user } = this.state
    const text = e.target.value
    if (text.length > 0) {
      // Найти подходящие под поиск задания
      const suitableTasks = currentGroup.tasks.map(task => {
        if (task.name.indexOf(text) !== -1) {
          return task
        }
      }).filter(item => item !== undefined)
      // Разбить задания на выполненные и невыполненные
      const { uncompletedTasks, completedTasks } = this.splitTasks(suitableTasks, user.id)
      this.setState({ query: { uncompletedTasks, completedTasks } })
    } else {
      this.setState({ query: {} })
    }
  }

  fetchData = async token => {
    const response = await this.client.query({ query: USER, variables: { token } })
    const { user } = response.data
    this.cache.writeData('user', user)
    const { currentGroup } = this.state
    user.groups.map(group => {
      if(group.id == currentGroup.id) {
        this.setState({ currentGroup: group, fetching: false })
        this.cache.writeData('currentGroup', group)
      } 
    })
  }

  componentDidMount = async () => {
    const { client, location } = this.props
    let user, token
    if (location.state) {
      user = location.state.user
      token = location.state.token
    }
    this.client = client
    if (user == undefined || token == undefined) {
      try {
        const cachedUser = await this.cache.readData('user')
        const currentGroup = await this.cache.readData('currentGroup')
        const token = await this.cache.readData('token')
        this.token = token
        this.setState({ user: cachedUser, currentGroup, fetching: true })
        this.fetchData(token)
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
    const { user, currentGroup, level, showCompleted, fetching, query } = this.state
    const { pathname } = this.props.location
    const { history } = this.props
    return (
      <div className="profile">
        <Header fetching={fetching} pathname={pathname} history={history} inputHandler={this.searchTasks} />

        <div className="section info">
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
                    <span>{currentGroup.name}</span>
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

        <div className="section tasks">
          <span className="title">Задания</span>
          <div className="containers">

            {
              query.completedTasks || query.uncompletedTasks ?
                query.uncompletedTasks && query.uncompletedTasks.length > 0 ?
                    query.uncompletedTasks.map(task => (
                    <div className="container of-task">
                      <div className="info">
                        <p className="name">{task.name}</p>
                        <p className="deadline">Осталось дней: <b>{this.determineRemainingDays(task)}</b></p>
                      </div>
                      <Button clickHandler={() => console.log('Ура!')} classNameProp="regular fluid" text="Выполнить" />
                    </div>
                    )
                  ) : <p className="no-tasks">Нет найдено подходящих заданий</p> :
                currentGroup.uncompletedTasks && currentGroup.uncompletedTasks.length > 0 ? 
                  currentGroup.uncompletedTasks.map(task => (
                  <div className="container of-task">
                    <div className="info">
                      <p className="name">{task.name}</p>
                      <p className="deadline">Осталось дней: <b>{this.determineRemainingDays(task)}</b></p>
                    </div>
                    <Button clickHandler={() => console.log('Ура!')} classNameProp="regular fluid" text="Выполнить" />
                  </div>
                )) : <p className="no-tasks">Нет невыполненных заданий</p>
            }

          </div>
        </div>

        <div className="section tasks">
          <span className="title">
            Показать выполненные задания
            <div className="switch">
              <label>
                <input type="checkbox" onChange={this.toggleCompletedTasks} />
                <span className="lever"></span>
              </label>
            </div>
          </span>
          <div className={'containers ' + (!showCompleted ? 'hide' : '')}>

            {
              query.completedTasks || query.uncompletedTasks ?
                query.completedTasks && query.completedTasks.length > 0 ?
                  query.completedTasks.map(task => (
                    <div className="container of-task">
                      <div className="info">
                        <p className="name">Модальный глагол cut</p>
                        <p className="deadline">Осталось дней: <b>{this.determineRemainingDays(task)}</b></p>
                        <p className="deadline">Ваш результат: <b>{this.getUserResult(task)}%</b></p>
                      </div>
                      <Button clickHandler={() => console.log('Ура!')} classNameProp="regular fluid" text="Улучшить результат" />
                    </div>
                  )) : <p className="no-tasks">Нет найдено подходящих заданий</p> :
                currentGroup.completedTasks && currentGroup.completedTasks.length > 0 ?
                  currentGroup.completedTasks.map(task => (
                  <div className="container of-task">
                    <div className="info">
                      <p className="name">{task.name}</p>
                      <p className="deadline">Осталось дней: <b>{this.determineRemainingDays(task)}</b></p>
                      <p className="deadline">Ваш результат: <b>{this.getUserResult(task)}%</b></p>
                    </div>
                    <Button clickHandler={() => console.log('Ура!')} classNameProp="regular fluid" text="Улучшить результат" />
                  </div>
                )) : <p className="no-tasks">Нет выполненных заданий</p>
            }

          </div>
        </div>

      </div>
    )
  }
}

export default withApollo(Profile)
