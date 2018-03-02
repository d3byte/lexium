import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default class Error404 extends Component {
  render() {
    return (
      <div className="main">
        <div class="wrapper">
        <div class="title">Ошибка 404</div>
        <div class="sub-title">К сожалению, такой страницы нет :(</div>
        <div class="proposal">Может вы искали одну из этих страниц?</div>
          <ul class="links">
              <li>
                  <Link to="/signin">Авторизация</Link>
              </li> |
              <li>
                  <Link to="/signup">Регистрация</Link>
              </li> |
              <li>
                  <Link to="/profile">Профиль</Link>
              </li>
          </ul>
        </div>
      </div>
    )
  }
}
