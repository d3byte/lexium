import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager } from '../../utils'

import './style.css'

export default class FlashCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: props.location.state.task,
      takenAttempts: props.location.state.takenAttempts
    }
    this.cache = new CacheManager()
  }

  toggleCard = e => {
    // Делегирую эвент и проверяю, чтобы место клика не было спаном, в котором
    // показано кол-во оставшихся карточек, или кнопками
    const { target } = e
    if (target.nodeName !== 'SPAN' && !target.classList.contains('on-top') &&
        target.nodeName !== 'BUTTON' && !target.classList.contains('controls')) {
      this.setState({ showKey: !this.state.showKey })
    }
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { showKey, task, takenAttempts } = this.state
    console.log(task)
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
          <span className="title">Карточки со словами</span>

            <div className="game-wrapper flash-cards">
              <div className="words">
                <div className="mobile-content">
                  <div className="previous-word">Apple</div>
                  <div className="next-word">Allergy</div>
                </div>
                <div className="previous-word">Apple</div>
                <div className="current-word" onClick={this.toggleCard}>
                  <span className="on-top">Осталось карточек: 8</span>
                  {
                    showKey ? 'Banana' : 'Банан'
                  }
                  <div className="control-buttons">
                    <Button clickHandler={() => console.log('Ура!')} classNameProp="regular" text="Знаю" />
                    <Button clickHandler={() => console.log('Ура  !')} classNameProp ="regular gray" text="Не знаю" />
                  </div>
                </div>
                <div className="next-word">Allergy</div>
              </div>
            </div>


        </div>

      </div>
    )
  }
}
