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
      currentWordPair: {},
      splittedWord: [],
      correct: false,
      index: 0,
      currentLetter: null
    }
    this.cache = new CacheManager()
    this.screenWidth = window.screen.innerWidth || document.clientWidth || document.body.clientWidth
  }

  getLetters = currentWord => {
    let letters = currentWord.split('').map((letter, index) => ({ id: index, letter }))
    return letters
  }

  keyDownHandler = e => {
    const { keyCode } = e
    switch (keyCode) {
      case 37:
        this.moveLetter('left')
        break
      case 39:
        this.moveLetter('right')
        break 
      case 13:
        this.stopMoving()
        break
      default:
        return
    }
  }

  chooseLetter = id => {
    const { currentLetter } = this.state
    if (currentLetter === null) {
      this.setState({ currentLetter: id })
      // Включить слушание клавиш, если на десктопе
      if (this.screenWidth >= 800) {
        window.addEventListener('keydown', this.keyDownHandler)
      }
    }
  }

  moveLetter = direction => {
    const { splittedWord, currentLetter } = this.state
    if (currentLetter === null) 
      return
    switch (direction) {
      case 'right':
        this.changeLetterOrder(currentLetter, splittedWord.indexOf(currentLetter) + 1)
        break
      case 'left':
        this.changeLetterOrder(currentLetter, splittedWord.indexOf(currentLetter) - 1)
        break
      default:
        return
    }
  }

  changeLetterOrder = (letter, index) => {
    const { splittedWord } = this.state
    let newIndex = index
    if (newIndex > splittedWord.length - 1)
      newIndex = 0
    if (newIndex < 0)
      newIndex = splittedWord.length - 1
    let copy = splittedWord.slice(0)
    const previousLetter = copy[newIndex],
      oldIndex = copy.indexOf(letter)
    copy[newIndex] = letter
    copy[oldIndex] = previousLetter
    this.setState({ splittedWord: copy })
  }

  incrementAttempt = () => {
    const { takenAttempts, task } = this.state
    const newTakenAttempts = { ...takenAttempts, scramble: takenAttempts.scramble + 1 }
    this.cache.writeData(`task-${task.id}`, newTakenAttempts)
    this.setState({ takenAttempts: newTakenAttempts })
  }

  stopMoving = () => {
    const { splittedWord, currentWordPair, index, task } = this.state
    const joinedCurrentWord = splittedWord.map(item => item.letter).join('')
    let correct = false
    if(joinedCurrentWord === currentWordPair.key)
      correct = true
    if (index === task.words.length - 1) {
      this.incrementAttempt()
      this.setState({ completed: true })
    }
    this.setState({ currentLetter: null, correct })
  }

  nextWord = () => {
    const { currentWordPair, task, index } = this.state
    if (index === task.words.length - 1) {
      return
    }
    const { key } = task.words[index + 1]
    const letters = this.getLetters(key)
    this.setState({ 
      splittedWord: shuffle(letters), currentWordPair: task.words[index + 1], 
      correct: false, index: index + 1 
    })
  }

  componentDidMount = () => {
    const { location, history } = this.props
    const task = ((location || {}).state || {}).task
    const takenAttempts = ((location || {}).state || {}).takenAttempts
    !task && (history.push('/profile'))
    this.setState({ task: { ...task, words: shuffle(task.words) }, takenAttempts })
    // Ставлю первое слово в игру
    const currentWordPair = shuffle(task.words)[0]
    const { key } = currentWordPair
    const letters = this.getLetters(key)
    this.setState({ splittedWord: shuffle(letters), currentWordPair })
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { currentWordPair, splittedWord, correct, currentLetter, task, takenAttempts, completed } = this.state

    if (Object.keys(task).length == 0) return ''

    const attemptsLeft = task.attempts.scramble - takenAttempts.learnWords > 0 ? 
      task.attempts.scramble - takenAttempts.scramble 
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
          <Gamebar task={task} currentTab="scramble" attempts={task.attempts} takenAttempts={takenAttempts} />
        </div>

        <div className="section">
          <span className="title">Карточки со словами</span>

          {
            !completed ? (
              <div className="game-wrapper">
                <div className={'currentWord ' + (correct ? 'lighter' : '')} >{currentWordPair.value}</div>
                {
                  correct ? (
                    <div className="correct-word">
                        <div className="word-container">
                          <span className="key">{currentWordPair.key}</span>
                        </div>
                        <Button clickHandler={this.nextWord} classNameProp="regular lighter" text="Следующее слово" />
                    </div>
                  ) : (
                    <div className="letters-wrapper">
                      <div className="letters">
                        {
                          splittedWord.map(item => (
                            <div 
                              key={item.id} 
                              className={'letter ' + (currentLetter && currentLetter.id === item.id ? 'selected' : '') }
                              onClick={() => this.chooseLetter(item)}
                            >
                              {item.letter}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                {
                  !correct && (
                    <div className={'controls ' + (currentLetter !== null ? 'active' : '')}>
                      <i onClick={() => this.moveLetter('left')} className="material-icons">keyboard_arrow_left</i>
                      <i onClick={this.stopMoving} className="material-icons">done</i>
                      <i onClick={() => this.moveLetter('right')} className="material-icons">keyboard_arrow_right</i>
                    </div>
                  )
                }
                </div>
                ) : (
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
