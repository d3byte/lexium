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
    }
    this.cache = new CacheManager()
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
            <span className="return-link" onClick={() => history.goBack()}>
              <i className="material-icons">arrow_back</i> Вернуться
            </span>
            <span className="title">Игры</span>
          </div>

          <div className="game-bar">
            <Link to="/task/learn" className="game">
              <span className="name">Выучи слова</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>В этой игре вам предстоит познакомиться со словами, пользуясь карточками. Вы можете перевернуть карточку,
                кликнув на неё, таким образом показав аналог на другом
                языке</p>
              </div>
            </Link>
            <Link to="/task/find" className="game active">
              <span className="name">Найди пару</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>В этой игре вам нужно искать слово на одном языке и его аналог на другом.
                Просто кликайте на карточку со словом и потом на карточку с предположительной парой</p>
              </div>
            </Link>
            <Link to="/task/typein" className="game">
              <span className="name">Введи слово</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>Введите эквивалент предложенного слова на другом языке</p>
              </div>
            </Link>
            <Link to="/task/scramble" className="game">
              <span className="name">Скрэмбл</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>Составляйте целые слова из букв, разбросанных в случайном порядке. Просто перетягивайте
                части слова на подходящее, по вашему мнению, место и проверьте ваши знания</p>
              </div>
            </Link>
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
