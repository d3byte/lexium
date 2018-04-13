import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager, shuffle } from '../../utils'

import './style.css'

export default class FlashCards extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {},
      knownWords: 0,
      unknownWords: 0,
      numberWords: 0,
      completed: false,
      percentage: null
    }
    this.cache = new CacheManager()
  }

  toggleCard = e => {
    // Делегирую эвент и проверяю, чтобы место клика не было спаном, в котором
    // показано кол-во оставшихся карточек, или кнопками
    const { target } = e
    if (target.nodeName !== 'SPAN' && !target.classList.contains('on-top') &&
        target.nodeName !== 'BUTTON' && !target.classList.contains('control-buttons')) {
      this.setState({ showKey: !this.state.showKey })
    }
  }

  nextWord = (e, know = false) => {
    const { numberWords, task } = this.state
    let knownWords= this.state.knownWords,
      unknownWords = this.state.unknownWords

    know ? knownWords++ : unknownWords++
    
    if (knownWords + unknownWords === task.words.length) {
      const percentage = Math.floor(knownWords * 100 / task.words.length)
      percentage >= 75 && this.incrementAttempt()
      this.setState({ completed: true, percentage })
      return
    }
    
    this.setState({ 
      numberWords: numberWords + 1,
      knownWords,
      unknownWords
    })
  }
  
  incrementAttempt = () => {
    const { takenAttempts, task } = this.state
    const newTakenAttempts = { ...takenAttempts, learnWords: takenAttempts.learnWords + 1 }
    this.cache.writeData(`task-${task.id}`, newTakenAttempts)
    this.setState({ takenAttempts: newTakenAttempts })
  }

  restart = () => {
    const { task } = this.state
    this.setState({ 
      completed: false, percentage: null, 
      knownWords: 0, unknownWords: 0, numberWords: 0,
      task: { ...task, words: shuffle(task.words) }
    })
  }


  componentDidMount = async () => {
    const { location, history } = this.props
    const task = ((location || {}).state || {}).task
    const takenAttempts = ((location || {}).state || {}).takenAttempts
    !task && (history.push('/profile'))
    this.setState({ task: { ...task, words: shuffle(task.words) }, takenAttempts })
    try {
      const cachedAttempts = await this.cache.readData(`task-${task.id}`)
      this.setState({ takenAttempts: cachedAttempts })
    } catch(error) {
      this.cache.writeData(`task-${task.id}`, this.state.takenAttempts)
    }
  }
  
  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { showKey, task, takenAttempts, numberWords, percentage, completed } = this.state

    if (Object.keys(task).length == 0) return ''

    const attemptsLeft = task.attempts.learnWords - takenAttempts.learnWords > 0 ? 
      task.attempts.learnWords - takenAttempts.learnWords 
      : 0
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
            completed ? 
              percentage < 75 ? 
                'Неудачное прохождение'
                : 'Успешное прохождение'
              : 'Карточки со словами'
          }
          </span>
          <div className="game-wrapper flash-cards">
          {
            !completed ? (
              <div className="words">
                <div className="mobile-content">
                  <div className="previous-word">
                    {numberWords !== 0 ? task.words[numberWords-1].key : ''}
                  </div>
                  <div className="next-word">
                  {numberWords >= task.words.length - 1 ? '' : task.words[numberWords+1].key}
                  </div>
                </div>
                <div className="previous-word">
                  {numberWords !== 0 ? task.words[numberWords-1].key : ''}
                </div>
                <div className="current-word" onClick={this.toggleCard}>
                  <span className="on-top">Осталось карточек: {task.words.length - numberWords}</span>
                  {
                    numberWords === task.words.length ? 
                      '' 
                      : showKey ? 
                        task.words[numberWords].value 
                        : task.words[numberWords].key
                  }
                  <div className="control-buttons">
                    <Button clickHandler={e => this.nextWord(e, true)} classNameProp="regular" text="Знаю" />
                    <Button clickHandler={this.nextWord} classNameProp ="regular gray" text="Не знаю" />
                  </div>
                </div>
                <div className="next-word">
                  {numberWords >= task.words.length - 1 ? '' : task.words[numberWords+1].key}
                </div>
              </div>
            ) : percentage < 75 ? (
                <div className="result_game">
                  <h1>Попробуйте ещё раз</h1>
                  <p>Ваш результат: {percentage}% из 75% необходимых</p>
                  <Button clickHandler={this.restart} classNameProp="regular" text="Пройти ещё раз" />
                </div>
              ) : 
              (
                <div className="result_game">
                  <h1>Вы успешно прошли игру!</h1>
                  <p>Необходимо ещё <b>{attemptsLeft}</b> прохождений</p>
                  <Button clickHandler={this.restart} classNameProp="regular" text="Пройти ещё раз" />
                </div>
              )
          }
          </div>

        </div>
      </div>
    )
  }
}
