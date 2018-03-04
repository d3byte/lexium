import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Error404 = () => (
  <div className="main">
    <div className="wrapper">
    <div className="title">Ошибка 404</div>
    <div className="sub-title">К сожалению, такой страницы нет :(</div>
    <div className="proposal">Может вы искали одну из этих страниц?</div>
      <ul className="links">
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

export default Error404