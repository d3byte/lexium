import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { Gamebar } from '../../components/Gamebar'

import { CacheManager } from '../../utils/index'
import { USER } from '../../graphql/queries'

import './style.css'

export default class componentName extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      takenAttempts: {
        learnWords: 0,
        findPair: 0,
        typeIn: 0,
        scramble: 0
      },
      fetching: false,
      testAvailable: false
    }
    this.cache = new CacheManager()
    this.client = {}
    this.token = ''
  }

  componentDidMount = async () => {
    const { location, history } = this.props
    const task = ((location || {}).state || {}).task
    !task && (history.push('/profile'))
    this.setState({ 
      task: { 
        ...task,
        words: (typeof task.words === 'string' ? JSON.parse(task.words) : task.words), 
        attempts: (typeof task.attempts === 'string' ? JSON.parse(task.attempts) : task.attempts), 
      } 
    })
    try {
      const cachedAttempts = await this.cache.readData(`task-${task.id}`)
      this.setState({ takenAttempts: cachedAttempts })
    } catch(error) {
      this.cache.writeData(`task-${task.id}`, this.state.takenAttempts)
    }
  }
  

  render() {
    const { fetching, testAvailable, task, takenAttempts } = this.state
    const { history } = this.props
    const { pathname } = this.props.location
    return (
      <div className="task">
        <Header fetching={fetching} pathname={pathname} history={history} />
        <div className="section info">
          <span className="title">Главное меню</span>
          <div className="containers">
            <div className="container of-info">
              <div className="container-main full-width">
                <div className="info equal-space">
                  <div className="name">
                    <span>{task.name}</span>
                  </div>
                  <p>Пар слов: <b>{task.words && task.words.length}</b></p>
                  {
                    (task.results || []).length > 0 ? (
                      <p>
                        Уже прошёл <b>{((task.results[0] || {}).user || {}).name}</b> и
                        {
                          (task.results || []).length > 1 && <span className="underlined"> {task.results.length - 1} других людей</span>
                        }
                      </p>
                    ) : <p>Никто ещё не прошёл это задание</p>
                  }
                </div>
                <div className="naming"></div>
              </div>
            </div>
            
            <div className="container of-info reverse">
              {
                <div className={'avatar ' + ((task.results || []).length > 0 ? '' : 'transparent')}>
                  <img src={''} alt="user-avatar" />
                </div>
              }
              <div className="container-main">
                <div className="info">
                  {
                    (task.results || []).length > 0 ? (
                      <div className="name">
                        <span>
                        {task.results[task.results.length - 1].user.name}
                        </span>
                      </div>
                    ) : <span className="no-results">Результатов пока нет</span>
                  }
                  {
                    (task.results || []).length > 0 && (
                      <p>Процент выполнения: <b>{task.results[task.results.length - 1].percentage}%</b></p>
                    )
                  }
                  {
                    (task.results || []).length > 0 && (
                      <p>Выучено слов: <b>{task.results[task.results.length - 1].wordsLearnt}</b></p>
                    )
                  }
                </div>
                <div className="naming">
                  Последний результат
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="section">
          <span className="title">Игры</span>
          <Gamebar task={task} attempts={task.attempts} takenAttempts={takenAttempts}/>
          {
            testAvailable && (
              <center>
                <div className="test-proposal">
                  <span>Вы можете пройти тест!</span>
                  <Button clickHandler={() => history.push('/task/test')} classNameProp="regular lighter" text="Перейти к тесту" />
                </div>
              </center>
            )
          }
        </div>

        <div className="section">
          <span className="title">
            Состав задания
          </span>
          <div className="word-table">
            <div className="table-row">
              <div className="cell heading">Слово</div>
              <div className="cell heading">Перевод</div>
            </div>
            {
              task.words && task.words.map(pair => (
                <div className="table-row" key={pair.id}>
                  <div className="cell">{pair.key}</div>
                  <div className="cell">{pair.value}</div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    )
  }
}
