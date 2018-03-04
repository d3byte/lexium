import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

import arrow from '../../assets/arrow.svg'

import { LOGIN } from '../../graphql/mutations'
import { USER_CACHE, TOKEN_CACHE } from '../../graphql/cache'
import { CacheManager } from '../../utils/index'

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      username: '',
      password: '',
      user: {}
    }
    this.cache = new CacheManager()
  }

  inputHandler(e, target) {
    this.setState({
      [target]: e.target.value
    })
  }

  submit = async () => {
    // Отправить форму
    const { username, password } = this.state
    this.setState({ loading: true })
    try {
      const data = await this.props.mutate(
        { variables: { username, password },
          update: (proxy, { data: { login } }) => {
            // proxy.writeQuery({ query: USER_CACHE, data: { user: login.user } })
            // proxy.writeQuery({ query: TOKEN_CACHE, data: { token: login.token } })
            let user = login.user
            user.groups.map(group => {
              group.superUsers = JSON.parse(group.superUsers)
              if (group.tasks) {
                group.tasks.map(task => {
                  task.words = JSON.parse(task.words)
                })
              }
            })
            this.cache.writeData('token', login.token)
            this.cache.writeData('user', login.user)
            this.cache.writeData('currentGroup', login.user.groups[0])
          }
        }
      )
      this.setState({ loading: false })
      const { user, token } = data.data.login
      this.props.history.push({ pathname: '/profile', state: { user, token } })
    } catch(error) {
      // Оповестить пользователя об ошибке
      this.setState({ loading: false })
    }

  }

  componentDidMount = async () => {
    try {
      const token = await this.cache.readData('token')
      this.props.history.push('/profile')
    } catch (error) {}
  }
  

  render() {
    const { loading } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header pathname={this.props.location.pathname}/>
          <div className="cards">
              <div className="card rounded">
                  <div className="card-header">Авторизация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'username')} className="line-based" placeholder="Логин"/>
                      <input type="password" onChange={e => this.inputHandler(e, 'password')} className="line-based" placeholder="Пароль"/>
                  </div>
                  <div className="card-footer">
                      <Button clickHandler={this.submit} classNameProp="authorization" text="Войти" />
                  </div>
              </div>
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