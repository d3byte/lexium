import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager, shuffle } from '../../utils'

import './style.css'
import { walkTree } from 'react-apollo';

export default class FindPair extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {},
      words: [],
      correct: [],
      incorrect: [],
      highlighted: [],
      selected: [],
      errorCounter: 0,
      completed: false,
      percentage: null
    }
    this.cache = new CacheManager()
  }

  incrementAttempt = () => {
    const { takenAttempts, task } = this.state
    const newTakenAttempts = { ...takenAttempts, findPair: takenAttempts.findPair + 1 }
    this.cache.writeData(`task-${task.id}`, newTakenAttempts)
    this.setState({ takenAttempts: newTakenAttempts })
  }

  checkPair = selected => {
    if (selected[0].pairId === selected[1].pairId) {
      const { task, errorCounter } = this.state
      let correct = this.state.correct.slice(0)
      correct.push(selected[0].id, selected[1].id)
      this.setState({ selected: [], highlighted: [], correct })
      const percentage = 100 - Math.floor(errorCounter * 100 / task.words.length)
      // Карточек получается в два раза больше, чем пар слов, значит нужно разделить их кол-во на два
      if (correct.length / 2 === task.words.length) {
        percentage >= 75 && this.incrementAttempt()
        this.setState({ completed: true })
      }
      this.setState({ percentage })
      return
    }
    this.setState({ 
      selected: [], highlighted: [], 
      incorrect: [selected[0].id, selected[1].id],
      errorCounter: this.state.errorCounter + 1
    })
  }

  selectWord = word => {
    const { correct } = this.state
    if (correct.includes(word.id))
      return
    let selected = this.state.selected.slice(0),
      highlighted = this.state.highlighted.slice(0)
    if (highlighted.length === 1) {
      selected.push(word)
      this.checkPair(selected)
      return
    }
    selected.push(word)
    highlighted.push(word.id)
    this.setState({ selected, highlighted, incorrect: [] })
  }

  prepareWords = task => {
    let words = [], index = 0
    
    task && ((task || {}).words || []).map(pair => {
      const key = {
        pairId: pair.id,
        id: ++index,
        value: pair.key
      }
      const value = {
        pairId: pair.id,
        id: ++index,
        value: pair.value
      }
      words.push(key, value)
      return pair
    })
    return shuffle(words)
  }

  restart = () => {
    const { task } = this.state
    this.setState({ 
      completed: false, percentage: null, selected: [],
      correct: [], incorrect: [], highlighted: [],
      errorCounter: 0, words: this.prepareWords(task),
      task: { ...task, words: shuffle(task.words) }
    })
  }

  componentDidMount = async () => {
    const { location, history } = this.props
    const task = ((location || {}).state || {}).task
    const takenAttempts = ((location || {}).state || {}).takenAttempts
    !task && (history.push('/profile'))
    this.setState({ 
      task: { ...task, words: shuffle(task.words) }, 
      takenAttempts, words: this.prepareWords(task) 
    })
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
    const { 
      task, takenAttempts, words, selected, 
      correct, incorrect, highlighted, completed, 
      percentage
    } = this.state

    if (Object.keys(task).length == 0) return ''

    const attemptsLeft = task.attempts.findPair - takenAttempts.findPair > 0 ? 
      task.attempts.findPair - takenAttempts.findPair 
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
          <Gamebar task={task} currentTab="find" attempts={task.attempts} takenAttempts={takenAttempts} />
          </div>

        <div className="section">
          <span className="title">
          {
            completed ? 
              percentage < 75 ? 
                'Неудачное прохождение'
                : 'Успешное прохождение'
              : 'Выбор пар'
          }
          </span>
          {
            !completed ? (
              <div className="game-wrapper find-pair">
                {
                  words.map(word => (
                    <div 
                      className={
                        'word ' + (highlighted.includes(word.id) ? 'selected ' : '') +  
                        (incorrect.includes(word.id) ? 'incorrect ' : '') +
                        (correct.includes(word.id) ? 'correct ' : '')
                      }
                      onClick={() => this.selectWord(word)}
                      key={word.id}
                    >
                      {word.value}
                    </div>
                  ))
                }
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
