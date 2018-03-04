import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Loading from '../../components/Loading'

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

  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <div className={'home ' + (loading && 'hide')}>
          <Header/>
          <div className="cards">
              <div className="card rounded">
                  <div className="card-header">Регистрация</div>
                  <div className="card-body">
                      <input type="text" onChange={e => this.inputHandler(e, 'firstName')} className="line-based" placeholder="Имя"/>
                      <input type="text" onChange={e => this.inputHandler(e, 'lastName')} className="line-based" placeholder="Фамилия"/>
                  </div>
                  <div className="card-footer">
                      <Button clickHandler={this.submit} classNameProp="authorization" text="Войти" />
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