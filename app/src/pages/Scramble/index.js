import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils'

import './style.css'

const shuffle = array => {
  let counter = array.length
  const copy = array.slice(0)
  while (counter > 0) {
      let index = Math.floor(Math.random() * counter)
      counter--
      let temp = copy[counter]
      copy[counter] = copy[index]
      copy[index] = temp
  }

  return copy
}

const getLetters = word => {
  let letters = word.split('').map((letter, index) => ({ id: index, letter }))
  return letters
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  console.log(result)

  return result
}

export default class Typein extends Component {
  constructor() {
    super()
    this.state = {
      word: 'Banana',
      splittedWord: []
    }
    this.cache = new CacheManager()
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const splittedWord = reorder(
      this.state.splittedWord,
      result.source.index,
      result.destination.index
    )

    this.setState({
      splittedWord,
    })
  }

  componentDidMount = () => {
    const { word } = this.state
    let letters = getLetters(word)
    console.log(letters)
    this.setState({ splittedWord: shuffle(letters) })
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { word, splittedWord } = this.state
    return (
      <div className="scramble-game">
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

          <span className="word">{word}</span>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="letters"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {splittedWord.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.letter}
                        </div>
                      
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        </div>

      </div>
    )
  }
}
