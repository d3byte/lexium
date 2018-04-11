import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager, shuffle } from '../../utils'

import './style.css'

export default class Typein extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: props.location.state.task,
      takenAttempts: props.location.state.takenAttempts,
      currentWord: 'Банан',
      currentKey: '',
      splittedWord: [],
      correct: false,
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

  stopMoving = () => {
    const { splittedWord, currentKey } = this.state
    const joinedCurrentWord = splittedWord.map(item => item.letter).join('')
    let correct = false
    if(joinedCurrentWord === currentKey)
      correct = true
    this.setState({ currentLetter: null, correct })
  }

  componentDidMount = () => {
    const { currentWord } = this.state
    const key = 'Banana'
    let letters = this.getLetters(key)
    this.setState({ splittedWord: shuffle(letters), currentKey: key })
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { currentWord, splittedWord, currentKey, correct, currentLetter, task, takenAttempts } = this.state
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

          <div className={'currentWord ' + (correct ? 'lighter' : '')} >{currentWord}</div>

          {
            correct ? (
              <div className="correct-word">
                  <span className="words-left">Осталось слов: 8</span>
                  <div className="word-container">
                    <span className="key">{currentKey}</span>
                  </div>
                  <Button clickHandler={() => console.log('Ура!')} classNameProp="regular lighter" text="Следующее слово" />
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

      </div>
    )
  }
}
