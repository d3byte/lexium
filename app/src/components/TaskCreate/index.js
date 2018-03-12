import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'

import './style.css'

const TaskCreate = ({}) => (
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
                          <p className="gameName">Выучи слово</p>
                            <div className="game-repeats">
                            <p className="game">кек</p>
                            </div>
                          </div>
                          <div className="container game">
                          <p className="gameName">Найди пару</p>
                          </div>
                          <div className="container game">
                          <p className="gameName">Введи слово</p>
                          </div>
                          <div className="container game">
                          <p className="gameName">Скрэмбл</p>
                          </div>                      
                    </div>
                  </div>
                </div>
)

export default TaskCreate