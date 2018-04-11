import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import { RadioButton } from '../../components/RadioButton'

import { CacheManager } from '../../utils'

import './style.css'

export default class Test extends Component {
  constructor() {
    super()
    this.state = {
      completed: false,
    }
    this.cache = new CacheManager()
  }

  componentDidMount = () => {
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { currentWord, splittedWord, currentKey, correct, currentLetter, completed } = this.state
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
                  <div className="word-group">
                    <label>Banana</label>
                    <input type="text" className="line-based" placeholder="Перевод" />
                  </div>
                  <div className="word-group">
                    <label>Allergy</label>
                    <input type="text" className="line-based" placeholder="Перевод" />
                  </div>
                </div>

                <div className="container">
                  <span className="title right">Выбор значения</span>
                  <div className="word-group">
                    <label>Манго</label>
                    <div className="variants">
                      <RadioButton label="Mango" name="Манго" value="Mango" />
                      <RadioButton label="Allergy" name="Манго" value="Allergy" />
                      <RadioButton label="KFC" name="Манго" value="KFC" />
                    </div>
                  </div>
                  <div className="word-group">
                    <label>Аллергия</label>
                    <div className="variants">
                      <RadioButton label="Mango" name="Аллергия" value="Cucumber" />
                      <RadioButton label="Allergy" name="Аллергия" value="Allergy" />
                      <RadioButton label="KFC" name="Аллергия" value="Chicken" />
                    </div>
                  </div>
                </div>

              </div>

              <center>
                <Button clickHandler={() => console.log('Ура!')} classNameProp="regular lighter" text="Отправить" />
              </center>

            </div>
          ) : (
            <div className="result">
              <div className="circle">
                <i className="material-icons">done_all</i>
              </div>
              <p>Вы прошли тест!</p>
              <p>Ваш результат: 36%</p>
              <Button clickHandler={() => console.log('Ура!')} classNameProp="regular lighter" text="Вернуться" />
            </div>
          )
        }

      </div>
    )
  }
}
