import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager, shuffle } from '../../utils'

import './style.css'

export default class FindPair extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: props.location.state.task,
      takenAttempts: props.location.state.takenAttempts,
      words: [],
      correct: [],
      incorrect: [],
      highlighted: [],
      selected: []
    }
    this.cache = new CacheManager()
  }

  checkPair = selected => {
    if (selected[0].pairId === selected[1].pairId) {
      let correct = this.state.correct.slice(0)
      correct.push(selected[0].id, selected[1].id)
      this.setState({ selected: [], highlighted: [], correct })
      return
    }
    this.setState({ 
      selected: [], highlighted: [], 
      incorrect: [selected[0].id, selected[1].id]
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

  componentDidMount = () => {
    const { task } = this.state
    let words = [], index = 0
    task.words.map(pair => {
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
    this.setState({ words: shuffle(words) })
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { task, takenAttempts, words, selected, correct, incorrect, highlighted } = this.state
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
          <span className="title">Выбор пар</span>

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


        </div>

      </div>
    )
  }
}
