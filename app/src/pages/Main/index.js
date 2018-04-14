import React, { Component } from 'react'

import './style.css'

import logo from '../../assets/Lexium_white.png'

export default class Main extends Component {
  render() {
    return (
      <div>
        <section className="background-image">
          <header className="home">
            <div className="logo">
              <img src={logo} />
            </div>
            <nav>
              <ul>
                <li><a href="">Главная</a></li>
                <li><a href="" className="login">Вход</a></li>
                <li><a href="" className="register">Регистрация</a></li>
              </ul>
            </nav>
          </header>
          <div className="section info">
            <h1 className="title-home">Давно хотите изучить иностранный язык, но устали от типичного обучения?</h1>
          </div>
        </section>
        <footer>
          <div className="section info">
          &copy;2017-2018 Copyright Lexium
          </div>
        </footer>
      </div>
    )
  }
}
