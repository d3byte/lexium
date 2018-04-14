import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { RadioButton } from '../../components/RadioButton'

import { SET_RESULT, UPDATE_RESULT } from '../../graphql/mutations'
import { CacheManager, shuffle, randomInt } from '../../utils'

import './style.css'

const arrayOfRandomIndexes = array => (
  [randomInt(0, array.length - 1), randomInt(0, array.length - 1)]
)

class Test extends Component {
  constructor() {
    super()
    this.state = {
      task: {},
      wordsToInput: [],
      wordsToRadio: [],
      completed: false,
      percentage: 0,
      loading: false
    }
    this.cache = new CacheManager()
    this.client = {}
  }

  setPairTestValue = (pair, value, ofInput = true) => {
    let wordsToInput = this.state.wordsToInput.slice(0),
      wordsToRadio = this.state.wordsToRadio.slice(0)
    if (ofInput) {
      const index = wordsToInput.indexOf(pair)
      wordsToInput[index] = { ...pair, test: value }
    } else {
      const index = wordsToRadio.indexOf(pair)
      wordsToRadio[index] = { ...pair, test: value }
    }
    this.setState({ wordsToInput, wordsToRadio })
  }

  sortWordsIntoTasks = task => {
    const words = (task || {}).words
    const indexOfHalf = Math.floor(task.words.length / 2) - 1
    const wordsToInput = (words || []).map((pair, index) => {
      if (index <= indexOfHalf) {
        return { ...pair, test: '' }
      }
    }).filter(item => item !== undefined)
    const wordsToRadio = (words || []).map((pair, index) => {
      const indexes = arrayOfRandomIndexes(words)
      let variants = indexes.map(index => words[index] ? words[index].key : null)
      variants.push(pair.key)
      if (index > indexOfHalf) {
        return { ...pair, test: '', variants: shuffle(variants) }
      }
    }).filter(item => item !== undefined)
    this.setState({ wordsToInput, wordsToRadio })
  }

  getUserResult = async task => {
    const user = await this.cache.readData('user')
    const result = task.results.filter(result => result.user.id === user.id)[0]
    return result
  }

  submit = async () => {
    const { wordsToInput, wordsToRadio, task, loading } = this.state
    if (loading) return
    this.setState({ loading: true })
    const oldResult = await this.getUserResult(task)
    let done = true, correctAnswers = 0
    wordsToInput.map(pair => {
      if (pair.test === '') {
        done = false
        return
      }
      if (pair.test === pair.value) {
        correctAnswers++
      }
    })
    if (!done) return
    wordsToRadio.map(pair => {
      if (pair.test === '') {
        done = false
        return
      }
      if (pair.test === pair.key) {
        correctAnswers++
      }
    })
    if (done) {
      const percentage = Math.floor(correctAnswers * 100 / task.words.length)
      const user = await this.cache.readData('user')
      let response
      if (!oldResult) {
        response = await this.client.mutate({
          mutation: SET_RESULT,
          variables: {
            id: task.id,
            res: { wordsLearnt: correctAnswers, percentage },
            userId: user.id
          }
        })
      } else {
        response = await this.client.mutate({
          mutation: UPDATE_RESULT,
          variables: {
            id: task.id,
            resultId: oldResult.id,
            res: { wordsLearnt: correctAnswers, percentage },
            userId: user.id
          }
        })
      }
      const result = oldResult ? response.data.updateResult : response.data.setResult
      // const newTask = { ...task, results: [...task.result, result] }
      this.setState({ percentage, loading: false, completed: true })
      return
    }
    this.setState({ loading: false })
  }

  componentDidMount = async () => {
    const { location, history, client } = this.props
    this.client = client
    const task = ((location || {}).state || {}).task
    !task && (history.push('/profile'))
    const handledTask = {
      ...task,
      words: (typeof task.words === 'string' ? shuffle(JSON.parse(task.words)) : shuffle(task.words)), 
      attempts: (typeof task.attempts === 'string' ? JSON.parse(task.attempts) : task.attempts), 
    }
    this.setState({ task: handledTask })
    this.sortWordsIntoTasks(handledTask)
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { completed, percentage, wordsToInput, wordsToRadio, task, loading } = this.state

    if (Object.keys(task).length == 0) return ''

    return (
      <div className="task-game">
        <Header fetching={false} pathname={pathname} history={history} />
        {
          !completed ? (
            <div className="section">
              <span className="return-link" onClick={() => history.goBack()}>
                <i className="material-icons">arrow_back</i> Вернуться
              </span>
              <div className="test-title">Тест</div>

              <div className="containers">
                <div className="container">
                  <span className="title">Перевод</span>
                  {
                    (wordsToInput || []).map(pair => (
                      <div className="word-group" key={pair.id}>
                        <label>{pair.key}</label>
                        <input type="text" className="line-based" placeholder="Перевод" onChange={e => this.setPairTestValue(pair, e.target.value)} />
                      </div>
                    ))
                  }
                </div>

                <div className="container">
                  <span className="title right">Выбор значения</span>
                  {
                    (wordsToRadio || []).map(pair => (
                      <div className="word-group" key={pair.id}>
                        <label>{pair.value}</label>
                        <div className="variants">
                          <RadioButton label={pair.variants[0]} name={pair.value} value={pair.variants[0]} handler={e => this.setPairTestValue(pair, e.target.value, false)} />
                          <RadioButton label={pair.variants[1]} name={pair.value} value={pair.variants[1]} handler={e => this.setPairTestValue(pair, e.target.value, false)} />
                          <RadioButton label={pair.variants[2]} name={pair.value} value={pair.variants[2]} handler={e => this.setPairTestValue(pair, e.target.value, false)} />
                        </div>
                      </div>
                    ))
                  }
                </div>

              </div>

              <center>
                <Button clickHandler={this.submit} classNameProp="regular lighter" text={loading ? 'Отправляем' : 'Отправить'} />
              </center>

            </div>
          ) : (
            <div className="result">
              <div className="circle">
                <i className="material-icons">done_all</i>
              </div>
              <p>Вы прошли тест!</p>
              <p>Ваш результат: {percentage}%</p>
              <Button clickHandler={() => history.push('/profile')} classNameProp="regular lighter" text="Вернуться" />
            </div>
          )
        }

      </div>
    )
  }
}

export default withApollo(Test)