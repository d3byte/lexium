import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../../../components/Button'

import { CacheManager } from '../../../../utils'
import { SUITABLE_USERS } from '../../../../graphql/queries'
import { ADD_USERS_TO_GROUP } from '../../../../graphql/mutations'

import './style.css'

export default class AddMember extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      group: {},
      query: '',
      suitableUsers: [],
      invitedUsers: [],
      success: true
    }
    this.client = null
    this.cache = new CacheManager()
    this.token = null
  }
  
  handler = e => {
    const { value } = e.target
    this.setState({ query: value, success: false })
    if (value.length === 0) {
      this.setState({ suitableUsers: [] })
    }
  }

  search = async () => {
    const { query, group } = this.state
    if (query !== '') {
      const response = await this.client.query({ 
        query: SUITABLE_USERS,  
        variables: { token: this.token, query, groupId: group.id }
      })
      const { suitableUsers } = response.data
      this.setState({ suitableUsers: suitableUsers.filter(item => item !== null) })
    }
  }
  
  addUser = user => {
    let { suitableUsers, invitedUsers } = this.state
    suitableUsers = suitableUsers.filter(suitableUser => suitableUser !== user)
    invitedUsers.push(user)
    this.setState({ suitableUsers, invitedUsers })
  }

  removeUser = user => {
    let { suitableUsers, invitedUsers } = this.state
    invitedUsers = invitedUsers.filter(invitedUser => invitedUser !== user)
    suitableUsers.push(user)
    this.setState({ suitableUsers, invitedUsers })
  }

  save = async () => {
    const { invitedUsers, group, user } = this.state
    let newGroup = Object.assign({}, group)
    let newUser = Object.assign({}, user)
    const users = invitedUsers.map(user => user.id)
    const response = await this.client.mutate({
      mutation: ADD_USERS_TO_GROUP,
      variables: { token: this.token, id: group.id, users }
    })
    console.log(newUser)
    Array.prototype.push.apply(invitedUsers, newGroup.users)
    console.log(newGroup)
    newUser.groups.map(group => {
      if(group.id === newGroup.id) {
        group = newGroup
      }
    })
    console.log('djuu')
    this.cache.writeData('user', newUser)
    this.setState({ 
      group: newGroup, user: newUser, 
      invitedUsers: [], suitableUsers: [],
      success: true 
    })
    
  }

  componentDidMount = () => {
    const { group, user, token, client } = this.props
    this.client = client
    this.token = token
    this.setState({ group, user })
  }

  render() {
    const { suitableUsers, invitedUsers, success } = this.state
    return (
      <div className="section group-subpage add-member">
        <div className="left containers">
          <div className="container new-member">
            <span className="title">Новый участник</span>
            <div className="form-group">
              <span className="tip">Введите имя или логин пользователя</span>
              <input 
                type="text" className="line-based" 
                placeholder="Имя или логин" onChange={this.handler} onBlur={this.search}
              />
            </div>
          </div>

          {
            suitableUsers.length > 0 && suitableUsers.map(user => (
              <div className="container suitable" key={user && user.id} onClick={() => this.addUser(user)}>
                <div className="avatar member">
                {
                  user && user.avatarUrl ? 
                    <img src={user && user.avatarUrl} alt="avatar"/>
                    : <i className="material-icons">person</i>
                }
                </div>
                <span className="name">{user && user.name}</span> |
                <span className="username"> {user && user.username}</span>
              </div>
            ))
          }

        </div>
        
        <div className="right containers invited">
          
          {
            invitedUsers.length > 0 ? invitedUsers.map((user, index) => (
              <div className="container suitable invited" key={user && user.id}>
              { index === 0 && <span className="title right">Приглашённые пользователи</span> }
                <div className="member-info">
                  <div className="avatar member">
                  {
                    user && user.avatarUrl ? 
                      <img src={user && user.avatarUrl} alt="avatar"/>
                      : <i className="material-icons">person</i>
                  }
                  </div>
                  <span className="name">{user && user.name}</span> |
                  <span className="username"> {user && user.username}</span>
                </div>
                <i className="material-icons" onClick={() => this.removeUser(user)}>close</i>
              </div>
            )) : (
              <div className="container empty">
                <span className="title right">Приглашённых пользователей нет</span>
              </div>
            )
          }
          {
            invitedUsers.length > 0 && <button className="regular save-words" onClick={this.save}>Пригласить</button>
          }
          { success && <p className="successful-message">Пользователи успешно добавлены</p> }
        </div>


      </div>
    )
  }
}
