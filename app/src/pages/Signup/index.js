import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import anime from 'animejs'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

import './style.css'

import arrow from '../../assets/arrow.svg'

import { SIGN_UP } from '../../graphql/mutations'
import { CHECK_USERNAME } from '../../graphql/mutations'
import { CHECK_EMAIL } from '../../graphql/mutations'
import { CacheManager } from '../../utils/index'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      cardIndex: 0,
      errorInput: '',
      error: ''
    }
    this.cache = new CacheManager()
  }

  inputHandler(e, target) {
    this.setState({
      [target]: e.target.value
    })
  }

  nextCard = async () => {
    const { cardIndex, username, email, firstName, lastName } = this.state
    if (cardIndex === 0 && (!firstName || !lastName)) return
    if (cardIndex === 1){
      const usernameResponce = await this.props.checkUsername({ variables: { username } })
      const usernameError  = usernameResponce.data.checkUsername.error
      if (usernameError) {
        this.setState({ error: usernameError, errorInput: 'username' })
        return
      }
      const emailResponce = await this.props.checkEmail({ variables: { email } })
      const emailError = emailResponce.data.checkEmail.error
      if (emailError) {
        this.setState({ error: emailError, errorInput: 'email' })
        return
      }
    }
    this.setState({ error: '', errorInput: '' })
    anime({
      targets: `.card-${cardIndex}`,
      translateY: { value: -50, duration: 1000 },
      translateX: { value: 1500, duration: 2000, delay: 900 }
    })
    setTimeout(() => this.setState({ cardIndex: this.state.cardIndex + 1 }), 900)
  }

  getFullName = () => {
    return this.state.firstName + ' ' + this.state.lastName
  }
  
  submit = async () => {
    const { username, email, password, repeatPassword } = this.state
    if (password !== repeatPassword) {
      const error = "Пароли не совпадают",
        errorInput = error === 'Пароли не совпадают' ? 'repeatPassword' : ''
      this.setState({ error, errorInput })
    } else {
      this.setState({ loading: true })
      const data = await this.props.signup({
        variables: { username, password, name: this.getFullName(), email }
      })
      let { user, token } = data.data.signup
      user.groups.map(group => {
        group.superUsers = JSON.parse(group.superUsers)
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
    } catch (error) { }
  }

  render() {
    const { loading, cardIndex, errorInput, error } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header pathname={this.props.location.pathname}/>
          <div className="cards">
          {
            error && error.length > 0 && <div className="error signup">{ error }</div>
          }
              <form onSubmit={e => e.preventDefault()} className="card card-0 signup rounded">
                  <div className="card-header">Регистрация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'firstName')} className="line-based" placeholder="Имя" required={true}/>
                      <input type="text" onChange={e => this.inputHandler(e, 'lastName')} className="line-based" placeholder="Фамилия" required={true}/>
                  </div>
                  <div className="card-footer">
                      <Button clickHandler={this.nextCard} classNameProp="authorization" text="Дальше" />
                  </div>
              </form>
              <form onSubmit={e => e.preventDefault()} className={'card card-1 signup rounded ' + (cardIndex === 1 && 'current') }>
                <div className="card-header">Регистрация</div>
                <div className="card-body">
                  <input type="text" onChange={e => this.inputHandler(e, 'username')} className={'line-based ' + (errorInput === 'username' ? 'error-input' : '')} placeholder="Логин" required={true}/>
                  <input type="email" onChange={e => this.inputHandler(e, 'email')} className={'line-based ' + (errorInput === 'email' ? 'error-input' : '')} placeholder="Почта" required={true}/>
                </div>
                <div className="card-footer">
                  <Button clickHandler={this.nextCard} classNameProp="authorization" text="Дальше" />
                </div>
              </form>
              <form onSubmit={e => e.preventDefault()} className={'card card-2 signup rounded ' + (cardIndex === 2 && 'current') }>
                <div className="card-header">Регистрация</div>
                <div className="card-body">
                  <input type="password" onChange={e => this.inputHandler(e, 'password')} className="line-based" placeholder="Пароль" required={true}/>
                  <input type="password" onChange={e => this.inputHandler(e, 'repeatPassword')} className={'line-based ' + (errorInput === 'repeatPassword' ? 'error-input' : '')} placeholder="Повторите пароль" required={true}/>
                </div>
                <div className="card-footer">
                  <Button clickHandler={this.submit} classNameProp="authorization" text="Зарегистрироваться" />
                </div>
              </form>
              <Link className="form-link" to="/signin">Есть аккаунт? <img src={arrow} alt="arrow" /></Link>
          </div>
      </div>
      {
        loading && <Loading />
      }
      </div>
    )
  }
}

export default compose(
  graphql(SIGN_UP, { name: 'signup' }),
  graphql(CHECK_USERNAME, { name: 'checkUsername' }),
  graphql(CHECK_EMAIL, { name: 'checkEmail' })
)(Signup);