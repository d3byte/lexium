import React, { Component } from 'react'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager } from '../../utils'

import './style.css'

export default class FindPair extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: props.location.state.task,
      takenAttempts: props.location.state.takenAttempts
    }
    this.cache = new CacheManager()
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { task, takenAttempts } = this.state
    return (
      <div className="task-game">
        <Header fetching={false} pathname={pathname} history={history} />
        <div className="section">

          <div className="titles">
            <span className="return-link" onClick={() => history.goBack()}>
              <i className="material-icons">arrow_back</i> Вернуться
            </span>
            <span className="title">Игры</span>
          </div>
          <Gamebar task={task} currentTab="find" attempts={task.attempts} takenAttempts={takenAttempts} />
          </div>

        <div className="section">
          <span className="title">Выбор пар</span>

            <div className="game-wrapper find-pair">
              <div className="word correct">Banana</div>
              <div className="word incorrect">Аллергия</div>
              <div className="word selected">Allergy</div>
              <div className="word incorrect">Font</div>
              <div className="word">Шрифт</div>
              <div className="word correct">Банан</div>
            </div>


        </div>

      </div>
    )
  }
}
