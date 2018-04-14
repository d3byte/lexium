import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager, shuffle } from '../../utils'

import './style.css'

export default class Typein extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {},
      rightWords: 0,
      errorCounter: 0,
      value: '',
      incorrect: false,
      completed: false,
      percentage: null
    }
    this.cache = new CacheManager()
  }

  incrementAttempt = () => {
    const { takenAttempts, task } = this.state
    const newTakenAttempts = { ...takenAttempts, typeIn: takenAttempts.typeIn + 1 }
    this.cache.writeData(`task-${task.id}`, newTakenAttempts)
    this.setState({ takenAttempts: newTakenAttempts })
  }

  checkWord = () => {
    const { task, value, rightWords, errorCounter } = this.state
    if (value === task.words[rightWords].value) {
      if (rightWords + 1 === task.words.length) {
        let percentage = 100 - Math.floor(errorCounter * 100 / task.words.length)
        percentage < 0 && (percentage = 0)
        percentage >= 75 && this.incrementAttempt()
        this.setState({ completed: true, percentage })
      }
      this.setState({ rightWords: rightWords + 1, value: '', incorrect: false })
      return
    }
    this.setState({ incorrect: true, errorCounter: errorCounter + 1 })
  }

  restart = () => {
    const { task } = this.state
    this.setState({
      completed: false, percentage: null, 
      rightWords: 0, errorCounter: 0, incorrect: false,
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
    const { task, takenAttempts, rightWords, value, incorrect, completed, percentage } = this.state

    if (Object.keys(task).length == 0) return ''

    const attemptsLeft = task.attempts.typeIn - takenAttempts.typeIn > 0 ? 
      task.attempts.typeIn - takenAttempts.typeIn 
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
          <Gamebar task={task} currentTab="typein" attempts={task.attempts} takenAttempts={takenAttempts} />
        </div>

        <div className="section">
          <span className="title">
          {
            completed ? 
              percentage < 75 ? 
                'Неудачное прохождение'
                : 'Успешное прохождение'
              : 'Ввод слова'
          }
          </span>
            {
              !completed ? (
                <div className="game-wrapper type-in">
                  <div className="info">
                    <span>Осталось карточек: {task.words.length - rightWords}</span>
                  </div>
                  <div className={'word-container ' + (incorrect ? 'incorrect' : '')}>
                    <span className="key">{rightWords >= task.words.length ? '' : task.words[rightWords].key}</span>
                    <input type="text" className="line-based" placeholder="Слово" focused={true} value={value} onChange={e => this.setState({value: e.target.value})} />
                  </div>
                  <Button clickHandler={this.checkWord} classNameProp="regular lighter" text="Проверить" />
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
    )
  }
}
