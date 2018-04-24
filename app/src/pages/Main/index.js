import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/Header'

import './style.css'
export default class Main extends Component {
  render() {
    const { pathname } = this.props.location
    const { history } = this.props
    return (
      <div className="home-page">
        <Header pathname={pathname} history={history} />
        <div className="section">
          <h1>Учить иностранные языки с Lexium - легко!</h1>
          <p>Просто зайдите в <Link to="/profile">профиль</Link> и попробуйте сами!
          </p>
        </div>
      </div>
    )
  }
}
