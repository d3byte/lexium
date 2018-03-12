import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'

import './style.css'

export default class AddMember extends Component {
  constructor() {
    super()
    this.state = {
        user: {}
    }
  }

  componentDidMount = () => {
    const { user } = this.props
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <div className="single-line">
        <div className="containers of-members">
          <div className="container of-newmember">
            <div className="info member">
              <span className="tip">Введите имя или логин пользователя</span>
              <input className="line-based" placeholder="Имя или логин"></input>
            </div>
          </div>

          <div className="container of-invited">
            <div className="invited-info">
              <div className="avatar">
                <img src={user && user.avatarUrl} alt="avatar"/>
              </div>
              <div className="metadata">
              <span className="name">Сергей Савтыра</span>
              <i class="material-icons">clear</i>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
