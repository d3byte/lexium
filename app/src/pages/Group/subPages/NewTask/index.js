import React, { Component } from 'react'

import { NumberInput } from '../../../../components/NumberInput'

import './style.css'

export default class NewTask extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="section group-subpage">
        <div className="left containers">
          <div className="container">
            <span className="title">Информация о задании</span>
            <div className="word-group">
              <label>Как назвать задание?</label>
              <input type="text" className="line-based" placeholder="Название" />
            </div>
            <div className="word-group">
              <label>Сколько дней на выполнение?</label>
              <input type="text" className="line-based" placeholder="Дни" />
            </div>
          </div>

          <div className="container attempts">
            <span className="title">Количество повторений</span>
            <div className="attempt-input">
              <span className="name">Выучи слово</span>
              <NumberInput/>
            </div>
            <div className="attempt-input">
              <span className="name">Найди пару</span>
              <NumberInput/>
            </div>
            <div className="attempt-input">
              <span className="name">Введи слово</span>
              <NumberInput/>
            </div>
            <div className="attempt-input">
              <span className="name">Скрэмбл</span>
              <NumberInput/>
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
                <div className="table-row">
                  <div className="cell">
                    <input type="text" placeholder="Banana" />
                  </div>
                  <div className="cell">
                    <input type="text" placeholder="Банан" />
                  </div>
                </div>
              </div>
              <button className="regular add-words">+</button>
              <button className="regular save-words">Сохранить изменения</button>
            </div>

          </div>
        </div>

      </div>
    )
  }
}
