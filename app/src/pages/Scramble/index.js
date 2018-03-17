import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager, shuffle } from '../../utils'

import './style.css'

export default class Typein extends Component {
  constructor() {
    super()
    this.state = {
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
    const { currentWord, splittedWord, currentKey, correct, currentLetter } = this.state
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
            <Link to="/task/scramble" className="game active">
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
