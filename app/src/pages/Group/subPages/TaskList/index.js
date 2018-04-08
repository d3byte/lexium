import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { UPDATE_TASK } from '../../../../graphql/mutations'

import './style.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: props.tasks,
      tasksBackup: props.tasks,
      selected: null,
      success: false,
      userIsAdmin: props.userIsAdmin
    }
    this.client = props.client
  }

  inputHandler = e => {
    const { name, value } = e.target
    let tasks = this.state.tasks.slice(0)
    let selected = Object.assign({}, this.state.selected)
    selected[name] = value
    tasks = tasks.map(task => {
      if (task.id === selected.id)
        return { ...selected, words: JSON.stringify(selected.words) }
      return task
    })
    this.setState({ selected, tasks })
  }

  selectTask = task => {
    this.setState({ 
      selected: { ...task, words: JSON.parse(task.words) },
      success: false,
      tasks: this.state.tasksBackup,
    })
  }

  addWordPair = () => {
    const { selected } = this.state
    let newWordPairs = this.state.selected.words.slice(0)
    newWordPairs.push({
      id: newWordPairs.length,
      key: '',
      value: ''
    })
    this.setState({ 
      selected: { ...selected, words: newWordPairs } 
    }, () => this.inputTofocus.focus())
  }

  removeWordPair = (item, index) => { 
    const { selected } = this.state
    let newWordPairs = selected.words.slice(0)
    newWordPairs = newWordPairs.filter(pair => pair.id !== item.id)
    this.setState({ selected: { ...selected, words: newWordPairs } })
  }

  hotkeyRemoveWordPair = (e, item, index) => {
    const { selected } = this.state
    const { keyCode } = e
    if(keyCode !== 8) {
      this.keyCode = keyCode
      return
    }
    if ((this.keyCode === 17 || this.keyCode === 224 || this.keyCode === 91) && keyCode === 8 && index !== 0) {
      this.keyCode = null
      this.removeWordPair(item, index)
    }
  }

  hotKeyAddWordPair = (e, index) => {
    const { keyCode } = e
    let newWordPairs = this.state.selected.words.slice(0)
    if (keyCode === 9 && index === newWordPairs.length - 1) {
      e.preventDefault()
      this.addWordPair()
    }
  }

  editWordPair = (e, item) => {
    const { selected } = this.state
    const { value, name } = e.target
    let newWordPairs = this.state.selected.words.slice(0)
    const index = newWordPairs.indexOf(item)
    if(value === '' && name === 'key') {
      e.target.addEventListener('keypress', e => this.removeWordPair(e, newWordPairs[index], index))
    } else {
      e.target.removeEventListener('keypress', e => this.removeWordPair(e, newWordPairs[index], index))
    }
    newWordPairs[index][name] = value
    this.setState({ selected: { ...selected, words: newWordPairs } })
  }

  save = async () => {
    const { selected, tasks } = this.state
    let newTasks = tasks.map(task => {
      if (task.id === selected.id)
        return { ...selected,  words: JSON.stringify(selected.words) }
      return task
    })
    this.setState({ tasks: newTasks, tasksBackup: newTasks })
    const data = await this.client.mutate({ 
      mutation: UPDATE_TASK, 
      variables: { id: selected.id, input: { name: selected.name, words: JSON.stringify(selected.words) } }
    })
    if (data !== null) {
      this.setState({ success: true })
    }
  }

  render() {
    const { tasks, selected, success, userIsAdmin } = this.state
    return (
      <div className="section group-subpage">
        <div className="left containers">
          {
            tasks.map((task, index) => (
              <div 
                key={task.id} 
                className={'container of-task-list ' + (selected && selected.id === task.id ? 'highlighted' : '') }
                onClick={() => this.selectTask(task)}
              >
                { index === 0 && <span className="title">Список заданий</span> }
                <p className="name">
                {
                  userIsAdmin ? 
                    <input className="clear" name="name" value={task.name} onChange={this.inputHandler}/>
                    : task.name
                }
                </p>
                <p className="task-info">Пар слов: <b>{task && JSON.parse(task.words).length}</b></p>
                <p className="task-info">Пройдено раз: <b>{task && task.results.length}</b></p>
                <p className="createdAT lightest">Создано: {task && task.createdAt.slice(0, 10)}</p>
              </div>
            ))
          }
        </div>

        {
          selected && userIsAdmin && (
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
                      selected.words.map((item, index) => (
                        <div className="table-row" key={item.id}>
                          <div className="cell">
                            <i 
                              className="material-icons" 
                              onClick={() => this.removeWordPair(item, index)}
                            >
                              close
                            </i>
                            <input 
                              type="text" placeholder="Banana" 
                              value={item.key} name="key"
                              className="clear"
                              onChange={e => this.editWordPair(e, item)}
                              onKeyDown={e => this.hotkeyRemoveWordPair(e, item, index)}
                              ref={ref => this.inputTofocus = ref}
                              required
                            />
                          </div>
                          <div className="cell">
                            <input 
                              type="text" placeholder="Банан" 
                              value={item.value} name="value"
                              className="clear"
                              onChange={e => this.editWordPair(e, item)}
                              onKeyDown={e => this.hotKeyAddWordPair(e, index)}
                              required
                            />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <button className="regular add-words" onClick={this.addWordPair}>+</button>
                  <button className="regular save-words" onClick={this.save}>
                    { success ? 'Сохранено' : 'Сохранить изменения' }
                  </button>
                </div>

              </div>
            </div>
          )
        }

      </div>
    )
  }
}

export default withApollo(TaskList)