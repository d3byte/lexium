import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { GROUP } from '../../../../graphql/queries'

import './style.css'

const TaskCreation = ({}) => (
  <div className="single-line">
    <div className="containers task-list">
      <div className="container of-task">
        <div className="info">
          <p className="name task-create">Как назвать задание?</p>
          <input className="line-based" placeholder="Название задания"></input>
          <p className="due-date task-create">Сколько дней на выполнение?</p>
          <input className="line-based" placeholder="Дни"></input>
        </div>
      </div>

      <div className="container of-repeat">
        <div className="titles">
          <span className="title">Количество повторений</span>
        </div>
        <div className="block-repeat">
          <div className="container game">
            <div className="game-name">Выучи слово</div>
            <div className="game-repeats">
              <span className="game-repeats remove">-</span>
              <span className="game-repeats number">4</span>
              <span className="game-repeats add">+</span>
            </div>
          </div>
          <div className="container game">
            <div className="game-name">Найди пару</div>
            <div className="game-repeats">
              <span className="game-repeats remove">-</span>
              <span className="game-repeats number">3</span>
              <span className="game-repeats add">+</span>
            </div>
          </div>
          <div className="container game">
            <div className="game-name">Введи слово</div>
            <div className="game-repeats">
              <span className="game-repeats remove">-</span>
              <span className="game-repeats number">2</span>
              <span className="game-repeats add">+</span>
            </div>
          </div>
          <div className="container game">
            <div className="game-name">Скрэмбл</div>
            <div className="game-repeats">
              <span className="game-repeats remove">-</span>
              <span className="game-repeats number">1</span>
              <span className="game-repeats add">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="containers edit-block">
      <div className="word-editor">
        <div className="word-table">
          <div className="table-row">
            <div className="cell edit-heading">Слово</div>
            <div className="cell edit-heading">Перевод</div>
          </div>
          <div className="table-row">
            <div className="cell">Banana</div>
            <div className="cell">Банан</div>
          </div>
          <div className="table-row">
            <div className="cell">Allergy</div>
            <div className="cell">Аллергия</div>
          </div>
        </div>
        <button className="regular add-words">+</button>
        <button className="regular save-words">Сохранить изменения</button>
      </div>

    </div>
  </div>
)

export default TaskCreation