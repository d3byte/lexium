import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager } from '../../utils'

import './style.css'

export default class Typein extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {},
      rightWords: 0,
      value: ''
    }
    this.cache = new CacheManager()
  }

  toggleCard = e => {
    // Делегирую эвент и проверяю, чтобы место клика не было спаном, в котором
    // показано кол-во оставшихся карточек
    const { target } = e
    if (target.nodeName !== 'SPAN' && !target.classList.contains('on-top')) {
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
    const { task, takenAttempts, rightWords, value } = this.state

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
          <Gamebar task={task} currentTab="typein" attempts={task.attempts} takenAttempts={takenAttempts} />
        </div>

        <div className="section">
          <span className="title">Карточки со словами</span>

            <div className="game-wrapper type-in">
                <div className="info">
                  <span>Процент выполнения: {rightWords == 0 ? 0 : Math.round(rightWords * (100 / task.words.length))}%</span>
                  <span>Осталось карточек: {rightWords == 0 ? task.words.length : task.words.length - rightWords}</span>
                </div>
                <div className="word-container">
                  <span className="key">{rightWords >= task.words.length ? '' : task.words[rightWords].key}</span>
                  <input type="text" className="line-based" placeholder="Слово" focused={true} value={value} onChange={e => this.setState({value: e.target.value})} />
                </div>
                <Button clickHandler={() => {
                  if (value == task.words[rightWords].value) {
                    this.setState({rightWords: rightWords+1, value: ''})
                  } else {
                    console.log("Слово неверное")
                  }
                }} classNameProp="regular lighter" text="Проверить" />
            </div>

        </div>

      </div>
    )
  }
}
