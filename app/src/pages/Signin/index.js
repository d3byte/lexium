import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

import arrow from '../../assets/arrow.svg'

import { LOGIN } from '../../graphql/mutations'
import { CacheManager } from '../../utils/index'

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      username: '',
      password: '',
      user: {},
      error: '',
      errorInput: ''
    }
    this.cache = new CacheManager()
  }

  inputHandler(e, target) {
    this.setState({
      [target]: e.target.value
    })
  }

  handleTasks = (tasks, userId) => {
    let uncompletedTasks = [], completedTasks = []
    tasks.map(task => {
      task.words = JSON.parse(task.words)
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

  submit = async e => {
    // Отправить форму
    const { username, password } = this.state
    if(username && password) {
      this.setState({ loading: true })
      const data = await this.props.mutate({ variables: { username, password } })
      const { error } = data.data.login
      if(error) {
        const errorInput = (error == 'Неверный пароль' ? 'password' : 'username')
        this.setState({ error, loading: false, errorInput: 'password' })
      } else {
        let { user, token } = data.data.login
        const groupsForCaching = user.groups.map(group => {
          group.superUsers = JSON.parse(group.superUsers)
          if (group.tasks) {
            const { uncompletedTasks, completedTasks } = this.handleTasks(group.tasks, user.id)
            group.uncompletedTasks = uncompletedTasks
            group.completedTasks = completedTasks
          }
          return { ...group, avatarUrl: '' }
        })
        console.log(groupsForCaching)
        this.cache.writeData('token', token)
        this.cache.writeData('user', { ...user, groups: groupsForCaching })
        this.cache.writeData('currentGroup', { ...user.groups[0], avatarUrl: '' })
        this.props.history.push({ pathname: '/profile', state: { user, token } })
      }
    }
  }

  componentDidMount = async () => {
    try {
      const token = await this.cache.readData('token')
      this.props.history.push('/profile')
    } catch (error) {}
  }
  

  render() {
    const { loading, error, errorInput } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header pathname={this.props.location.pathname}/>
          <div className="cards">
            {
              error.length > 0 && <div className="error">{ error }</div>
            }
            <form onSubmit={e => e.preventDefault()}>
              <div className="card rounded">
                  <div className="card-header">Авторизация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'username')} className={'line-based ' + (errorInput === 'username' ? 'error-input' : '')} placeholder="Логин" required/>
                      <input type="password" onChange={e => this.inputHandler(e, 'password')} className={'line-based ' + (errorInput === 'password' ? 'error-input' : '')} placeholder="Пароль" required/>
                  </div>
                  <div className="card-footer">
                      <Button clickHandler={this.submit} classNameProp="authorization" text="Войти" />
                  </div>
              </div>
            </form>
            <Link className="form-link" to="/signup">Нет аккаунта? <img src={arrow} alt="arrow"/></Link>
          </div>
        </div>
        {
          loading && (<Loading />)
        }
      </div>
    )
  }
}

export default graphql(LOGIN)(Signin)