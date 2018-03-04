import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import anime from 'animejs'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

import './style.css'

import arrow from '../../assets/arrow.svg'

import { SIGN_UP } from '../../graphql/mutations'

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
      cardIndex: 0
    }
  }

  inputHandler(e, target) {
    this.setState({
      [target]: e.target.value
    })
  }

  nextCard = () => {
    const { cardIndex } = this.state
    const animation = anime({
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
    // Отправить форму

  }

  render() {
    const { loading, cardIndex } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header pathname={this.props.location.pathname}/>
          <div className="cards">
              <div className="card card-0 signup rounded">
                  <div className="card-header">Регистрация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'firstName')} className="line-based" placeholder="Имя"/>
                      <input type="text" onChange={e => this.inputHandler(e, 'lastName')} className="line-based" placeholder="Фамилия"/>
                  </div>
                  <div className="card-footer">
                      <Button clickHandler={this.nextCard} classNameProp="authorization" text="Дальше" />
                  </div>
              </div>
              <div className={'card card-1 signup rounded ' + (cardIndex == 1 && 'current') }>
                <div className="card-header">Регистрация</div>
                <div className="card-body">
                  <input type="text" onChange={e => this.inputHandler(e, 'username')} className="line-based" placeholder="Логин" />
                  <input type="email" onChange={e => this.inputHandler(e, 'email')} className="line-based" placeholder="Почта" />
                </div>
                <div className="card-footer">
                  <Button clickHandler={this.nextCard} classNameProp="authorization" text="Дальше" />
                </div>
              </div>
              <div className={'card card-2 signup rounded ' + (cardIndex == 2 && 'current') }>
                <div className="card-header">Регистрация</div>
                <div className="card-body">
                  <input type="password" onChange={e => this.inputHandler(e, 'password')} className="line-based" placeholder="Пароль" />
                  <input type="password" onChange={e => this.inputHandler(e, 'repeatPassword')} className="line-based" placeholder="Повторите пароль" />
                </div>
                <div className="card-footer">
                  <Button clickHandler={this.submit} classNameProp="authorization" text="Зарегистрироваться" />
                </div>
              </div>
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

export default graphql(SIGN_UP)(Signup)