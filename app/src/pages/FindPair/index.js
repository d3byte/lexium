import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils'

import './style.css'

export default class FindPair extends Component {
  constructor() {
    super()
    this.state = {
      showKey: false,
    }
    this.cache = new CacheManager()
  }

  toggleCard = e => {
    // Делегирую эвент и проверяю, чтобы место клика не было спаном, в котором
    // показано кол-во оставшихся карточек
    const { target } = e
    if (target.nodeName !== 'SPAN' && !target.classList.contains('on-top')) {
      this.setState({ showKey: !this.state.showKey })
    }
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { showKey } = this.state
    return (
      <div className="task-game">
        <Header fetching={false} pathname={pathname} history={history} />
        <div className="section">

          <div className="titles">
            <Link className="return-link" to="/task">
              <i className="material-icons">arrow_back</i> Вернуться
            </Link>
            <span className="title">Игры</span>
          </div>

          <div className="game-bar">
            <div className="game">
              <span className="name">Выучи слова</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>В этой игре вам предстоит познакомиться со словами, пользуясь карточками. Вы можете перевернуть карточку,
                кликнув на неё, таким образом показав аналог на другом
                языке</p>
              </div>
            </div>
            <div className="game active">
              <span className="name">Найди пару</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>В этой игре вам нужно искать слово на одном языке и его аналог на другом.
                Просто кликайте на карточку со словом и потом на карточку с предположительной парой</p>
              </div>
            </div>
            <div className="game">
              <span className="name">Введи слово</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>Введите эквивалент предложенного слова на другом языке</p>
              </div>
            </div>
            <div className="game">
              <span className="name">Скрэмбл</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>Составляйте целые слова из букв, разбросанных в случайном порядке. Просто перетягивайте
                части слова на подходящее, по вашему мнению, место и проверьте ваши знания</p>
              </div>
            </div>
          </div>

        </div>

        <div className="section">
          <span className="title">Выбор пар</span>

            <div className="game-wrapper find-pair">
              <div className="word correct">Banana</div>
              <div className="word incorrect">Аллергия</div>
              <div className="word selected">Allergy</div>
              <div className="word incorrect">Font</div>
              <div className="word">Шрифт</div>
              <div className="word correct">Банан</div>
            </div>


        </div>

      </div>
    )
  }
}
