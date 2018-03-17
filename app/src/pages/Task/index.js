import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import './style.css'

export default class componentName extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      testAvailable: false
    }
  }

  render() {
    const { fetching, testAvailable } = this.state
    const { history } = this.props
    const { pathname } = this.props.location
    return (
      <div className="task">
        <Header fetching={fetching} pathname={pathname} history={history} />
        <div className="section info">
          <span className="title">Главное меню</span>
          <div className="containers">
            <div className="container of-info">
              <div className="container-main full-width">
                <div className="info equal-space">
                  <div className="name">
                    <span>Модальный глагол cut</span>
                  </div>
                  <p>Пар слов: <b>8</b></p>
                  <p>Уже прошёл <b>Иван Сергеев</b> и <span class="underlined">12 других людей</span></p>
                </div>
                <div className="naming"></div>
              </div>
            </div>
            
            <div className="container of-info reverse">
              <div className="avatar">
                <img src={''} alt="user-avatar" />
              </div>
              <div className="container-main">
                <div className="info">
                  <div className="name">
                    <span>Сергей Савтыра</span>
                  </div>
                  <p>Процент выполнения: <b>80%</b></p>
                  <p>Выучено слов: <b>6</b></p>
                </div>
                <div className="naming">
                  Последний результат
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="section">
          <span className="title">Игры</span>
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
            <Link to="/task/find" className="game">
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
          {
            testAvailable && (
              <center>
                <div className="test-proposal">
                  <span>Вы можете пройти тест!</span>
                  <Button clickHandler={() => history.push('/task/test')} classNameProp="regular lighter" text="Перейти к тесту" />
                </div>
              </center>
            )
          }
        </div>

        <div className="section">
          <span className="title">
            Состав задания
          </span>
          <div className="word-table">
            <div className="table-row">
              <div className="cell heading">Слово</div>
              <div className="cell heading">Перевод</div>
            </div>
            <div className="table-row">
              <div className="cell">Banana</div>
              <div className="cell">Банан</div>
            </div>
            <div className="table-row">
              <div className="cell">Allergy</div>
              <div className="cell">Аллергия</div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
