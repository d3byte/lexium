import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager } from '../../utils'

import './style.css'

export default class FlashCards extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {},
      know: [],
      dontKnow: [],
      numberWords: 0
    }
    this.cache = new CacheManager()
  }

  toggleCard = e => {
    // Делегирую эвент и проверяю, чтобы место клика не было спаном, в котором
    // показано кол-во оставшихся карточек, или кнопками
    const { target } = e
    if (target.nodeName !== 'SPAN' && !target.classList.contains('on-top') &&
        target.nodeName !== 'BUTTON' && !target.classList.contains('controls')) {
      this.setState({ showKey: !this.state.showKey })
    }
  }

  componentDidMount = () => {
    const { location, history } = this.props
    const task = ((location || {}).state || {}).task
    const takenAttempts = ((location || {}).state || {}).takenAttempts
    !task && (history.push('/profile'))
    this.setState({ task, takenAttempts })
  }
  
  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { showKey, task, takenAttempts, numberWords, know, dontKnow } = this.state
    
    if (Object.keys(task).length == 0) return ''
    return (
      <div className="task-game">
        <Header fetching={false} pathname={pathname} history={history} />
        <div className="section">

          <div className="titles">
            <Link className="return-link" to={{ pathname: '/task', state: { task } }}>
              <i className="material-icons">arrow_back</i> Вернуться
            </Link>
            <span className="title">Игры</span>
          </div>

          <Gamebar task={task} currentTab="learn" attempts={task.attempts} takenAttempts={takenAttempts} />

        </div>

        <div className="section">
          <span className="title">
          {
            numberWords === task.words.length ? 
              (Math.round(know.length * (100 / task.words.length)) < 75 ? 
                'Неудачное прохождение' 
                : 'Успешное прохождение') 
              : 'Карточки со словами'
          }
          </span>
            <div className="game-wrapper flash-cards">
            {numberWords != task.words.length ? (
              <div className="words">
                <div className="mobile-content">
                  <div className="previous-word">
                    {
                      numberWords < 1 ? '' : task.words[numberWords-1].key
                    }
                  </div>
                  <div className="next-word">
                    {
                      numberWords >= task.words.length - 1 ? '' : task.words[numberWords+1].key
                    }
                  </div>
                </div>
                <div className="previous-word">
                  {
                    numberWords < 1 ? '' : task.words[numberWords-1].key
                  }
                </div>
                <div className="current-word" onClick={this.toggleCard}>
                  <span className="on-top">Осталось карточек: { numberWords == 0 ? task.words.length : task.words.length - numberWords }</span>
                  {
                    numberWords == task.words.length ? (numberWords == task.words.length ? 'Результат ' + Math.round(know.length * (100 / task.words.length)) +'%' : '') : showKey ? task.words[numberWords].value : task.words[numberWords].key
                  }
                  <div className="control-buttons">
                    { numberWords != task.words.length ? 
                    <Button clickHandler={() => {
                      let knowData = know.slice(0)
                      knowData.push(task.words[numberWords])
                      this.setState({ 
                        numberWords: numberWords+1,
                        know: knowData
                      })
                    }} classNameProp="regular" text="Знаю" />
                    : ''}
                    { numberWords != task.words.length ?
                    <Button clickHandler={() => { 
                      let dontKnowData = dontKnow.slice(0)
                      dontKnowData.push(task.words[numberWords])
                      this.setState({ 
                        numberWords: numberWords+1,
                        dontKnow: dontKnowData
                      })
                    }} classNameProp ="regular gray" text="Не знаю" />
                    : ''}
                  </div>
                </div>
                <div className="next-word">
                {
                  numberWords >= task.words.length - 1 ? '' : task.words[numberWords+1].key
                }
                </div>
              </div>
            ) : (Math.round(know.length * (100 / task.words.length)) < 75) ? (
              <div className="result_game">
                <h1>Попробуйте ещё раз</h1>
                <p>Ваш результат: {Math.round(know.length * (100 / task.words.length))}% из 75% необходимых</p>
                <Button clickHandler={() => console.log('petuch')} classNameProp="regular" text="Пройти ещё раз" />
              </div>
            ) : 
            (
              <div className="result_game">
                <h1>Вы успешно прошли игру!</h1>
                <p>Необходимо ещё <b>{task.attempts.learnWords}</b> {task.attempts.learnWords == 1 ? 'прохождение' : 'прохождения'}</p>
                <Button clickHandler={() => console.log('petuch')} classNameProp="regular" text="Пройти ещё раз" />
              </div>
            )}
            </div>
            
        </div>
      </div>
    )
  }
}
