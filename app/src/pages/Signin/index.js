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

  submit = async () => {
    // Отправить форму
    const { username, password } = this.state
    this.setState({ loading: true })
      const data = await this.props.mutate({ variables: { username, password } })
      const { error } = data.data.login
      if(error) {
        const errorInput = error == 'Неверный пароль' ? 'password' : 'username'
        this.setState({ error, loading: false, errorInput })
       } else {
        let { user, token } = data.data.login
        user.groups.map(group => {
          group.superUsers = JSON.parse(group.superUsers)
          if (group.tasks) {
            group.tasks.map(task => {
              task.words = JSON.parse(task.words)
            })
          }
        })
        this.cache.writeData('token', token)
        this.cache.writeData('user', user)
        this.cache.writeData('currentGroup', user.groups[0])
        this.props.history.push({ pathname: '/profile', state: { user, token } })
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
            <form>
              <div className="card rounded">
                  <div className="card-header">Авторизация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'username')} className={'line-based ' + (errorInput === 'username' ? 'error-input' : '')} placeholder="Логин"/>
                      <input type="password" onChange={e => this.inputHandler(e, 'password')} className={'line-based ' + (errorInput === 'password' ? 'error-input' : '')} placeholder="Пароль"/>
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