import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

import arrow from '../../assets/arrow.svg'

import { LOGIN } from '../../graphql/mutations'

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      username: '',
      password: ''
    }
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
      const data = await this.props.mutate({ variables: { username, password } })
      console.log(data)
      // Обработать данные
    } catch(error) {
      // Оповестить пользователя об ошибке
      this.setState({ loading: false })
      throw new Error(error)
    }

  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header/>
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
        loading && <Loading />
      }
      </div>
    )
  }
}

export default graphql(LOGIN)(Signin)