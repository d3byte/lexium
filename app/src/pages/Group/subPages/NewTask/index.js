import React, { Component } from 'react'

import { CacheManager } from '../../../../utils'
import { NumberInput } from '../../../../components/NumberInput'
import { CREATE_TASK } from '../../../../graphql/mutations'

import './style.css'

export default class NewTask extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      deadline: '',
      learnWords: 1,
      findPair: 1,
      typeIn: 1,
      scramble: 1,
      wordPairs: [{
        id: 0,
        key: '',
        value: ''
      }],
      groupId: null,
      success: false
    }
    this.cache = new CacheManager()
    this.inputTofocus = null
    this.keyCode = null
  }

  infoInput = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  attemptInput = (value, field) => {
    if (value >= 0)
      this.setState({ [field]: value })
  }


  addWordPair = () => {
    let newWordPairs = this.state.wordPairs.slice(0)
    newWordPairs.push({
      id: newWordPairs.length,
      key: '',
      value: ''
    })
    this.setState({ wordPairs: newWordPairs }, () => this.inputTofocus.focus())
  }

  removeWordPair = (e, item, index) => { 
    const { keyCode } = e
    if(keyCode !== 8) {
      this.keyCode = keyCode
      return
    }
    if ((this.keyCode === 17 || this.keyCode === 224 || this.keyCode === 91) && keyCode === 8 && index !== 0) {
      this.keyCode = null
      let newWordPairs = this.state.wordPairs.slice(0)
      newWordPairs = newWordPairs.filter(pair => pair.id !== item.id)
      this.setState({ wordPairs: newWordPairs })
    }
  }

  hotKeyAddWordPair = (e, index) => {
    const { keyCode } = e
    let newWordPairs = this.state.wordPairs.slice(0)
    if (keyCode === 9 && index === newWordPairs.length - 1) {
      e.preventDefault()
      this.addWordPair()
    }
  }

  editWordPair = (e, item) => {
    const { value, name } = e.target
    let newWordPairs = this.state.wordPairs.slice(0)
    const index = newWordPairs.indexOf(item)
    if(value === '' && name === 'key') {
      e.target.addEventListener('keypress', e => this.removeWordPair(e, newWordPairs[index], index))
    } else {
      e.target.removeEventListener('keypress', e => this.removeWordPair(e, newWordPairs[index], index))
    }
    newWordPairs[index][name] = value
    this.setState({ wordPairs: newWordPairs })
  }

  nullFields = () => {
    this.setState({
      name: '',
      deadline: '',
      learnWords: 1,
      findPair: 1,
      typeIn: 1,
      scramble: 1,
      wordPairs: [{
        id: 0,
        key: '',
        value: ''
      }]
    })
  }

  submit = async () => {
    const { 
      name, deadline, learnWords, 
      typeIn, findPair, scramble, 
      wordPairs, groupId
    } = this.state
    let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate() + parseInt(deadline),
      maxDays = new Date(year, month - 1, 0).getDate()
    while (day > maxDays) {
      day -= maxDays
      month += 1
    }
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    const deadlineDate = `${year}-${month}-${day}T00:00:00.480Z`
    try {
      const response = await this.client.mutate({ 
        mutation: CREATE_TASK, 
        variables: { 
          input: { name, deadline: deadlineDate },
          words: wordPairs,
          groupId,
          attempts: { learnWords, findPair, typeIn, scramble }
        }
      })
      let task = response.data.createTask
      task.attempts = JSON.parse(task.attempts)
      task.words = JSON.parse(task.words)
      let user = await this.cache.readData('user')
      user.groups.map(group => {
        if(group.id === groupId) {
          group.tasks.push(task)
        }
      })
      this.cache.writeData('user', user).then(() => {
        this.nullFields()
        this.setState({ success: true })
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentWillReceiveProps = props => {
    const { groupId, client } = props
    this.client = client
    this.setState({ groupId })
  }

  render() {
    const { learnWords, findPair, typeIn, scramble, wordPairs, success } = this.state
    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.submit()
      }} className="section group-subpage">
        <div className="left containers">
          <div className="container">
            <span className="title">Информация о задании</span>
            <div className="word-group">
              <label>Как назвать задание?</label>
              <input 
                type="text" className="line-based" 
                placeholder="Название" name="name" 
                onChange={this.infoInput} required
              />
            </div>
            <div className="word-group">
              <label>Сколько дней на выполнение?</label>
              <input 
                type="number" className="line-based" 
                placeholder="Дни" name="deadline" 
                onChange={this.infoInput} required
              />
            </div>
          </div>

          <div className="container attempts">
            <span className="title">Количество повторений</span>
            <div className="attempt-input">
              <span className="name">Выучи слова</span>
              <NumberInput handler={this.attemptInput} value={learnWords} field="learnWords" />
            </div>
            <div className="attempt-input">
              <span className="name">Найди пару</span>
              <NumberInput handler={this.attemptInput} value={findPair} field="findPair" />
            </div>
            <div className="attempt-input">
              <span className="name">Введи слово</span>
              <NumberInput handler={this.attemptInput} value={typeIn} field="typeIn" />
            </div>
            <div className="attempt-input">
              <span className="name">Скрэмбл</span>
              <NumberInput handler={this.attemptInput} value={scramble} field="scramble" />
            </div>
          </div>

        </div>
        
        <div className="right containers">
          <div className="container editor">
            <span className="title right">Редактор слов</span>
            <div className="word-editor">
              <div className="word-table">
                <div className="table-row">
                  <div className="cell edit-heading">Слово</div>
                  <div className="cell edit-heading">Перевод</div>
                </div>
                {
                  wordPairs.map((item, index) => (
                    <div className="table-row" key={item.id}>
                      <div className="cell">
                        <input 
                          type="text" placeholder="Banana" 
                          name="key" onChange={e => this.editWordPair(e, item)}
                          onKeyDown={e => this.removeWordPair(e, item, index)}
                          ref={ref => this.inputTofocus = ref}
                          required
                        />
                      </div>
                      <div className="cell">
                        <input 
                          type="text" placeholder="Банан" 
                          name="value" onChange={e => this.editWordPair(e, item)}
                          onKeyDown={e => this.hotKeyAddWordPair(e, index)}
                          required
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
              <button className="regular add-words" onClick={this.addWordPair}>+</button>
              <button className="regular save-words">Сохранить изменения</button>
              { success && <p className="success-msg">Задание успешно создано</p> }
            </div>

          </div>
        </div>

      </form>
    )
  }
}
