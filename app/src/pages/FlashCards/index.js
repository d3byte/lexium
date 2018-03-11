import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils'

import './style.css'

export default class FlashCards extends Component {
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
            <div className="game active">
              <span className="name">Выучи слова</span>
              <span className="attempts">Пройдено <b>1/3</b></span>
              <div className="hint">
                <p>В этой игре вам предстоит познакомиться со словами, пользуясь карточками. Вы можете перевернуть карточку,
                кликнув на неё, таким образом показав аналог на другом
                языке</p>
              </div>
            </div>
            <div className="game">
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
          <span className="title">Карточки со словами</span>

            <div className="game-wrapper">
              <div className="words">
                <div className="mobile-content">
                  <div className="previous-word">Apple</div>
                  <div className="next-word">Allergy</div>
                </div>
                <div className="previous-word">Apple</div>
                <div className="current-word" onClick={this.toggleCard}>
                  <span className="on-top">Осталось карточек: 8</span>
                  {
                    showKey ? 'Banana' : 'Банан'
                  }
                  <div className="controls">
                    <Button clickHandler={() => console.log('Ура!')} classNameProp="regular" text="Знаю" />
                    <Button clickHandler={() => console.log('Ура  !')} classNameProp ="regular gray" text="Не знаю" />
                  </div>
                </div>
                <div className="next-word">Allergy</div>
              </div>
            </div>


        </div>

      </div>
    )
  }
}
