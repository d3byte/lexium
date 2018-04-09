import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import AddMember from './subPages/AddMember'
import Settings from './subPages/Settings'
import TaskList from './subPages/TaskList'
import NewTask from './subPages/NewTask'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'
import { UPDATE_GROUP_AVATAR } from '../../graphql/mutations'

import './style.css'

class Group extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 'new-task',
      user: {},
      group: {},
      image: '',
      updatedAvatar: false
    }
    this.client = {}
    this.cache = new CacheManager()
    this.token = ''
  }

  uploadImage = e => {
    const { group } = this.state
    const file = e.target.files[0]
    if (!file) {
      return
    }
    this.setState({ fetching: true })
    const reader = new FileReader()
    reader.onload = async e => {
      this.setState({ image: e.target.result })
      const { data } = await this.client.mutate({
        mutation: UPDATE_GROUP_AVATAR, 
        variables: { token: this.token, id: group.id, avatarUrl: e.target.result } 
      })
      const newGroup = data.updateGroupAvatar
      this.cacheNewGroup(newGroup)
      if (newGroup) {
        this.setState({ group: newGroup, fetching: false, updatedAvatar: true })
      }
    }
    reader.readAsDataURL(file)
  }

  cacheNewGroup = group => {
    const user = Object.assign({}, this.state.user)
    user.groups = user.groups.map(item => {
      if (item.id === group.id)
        return group
      return item
    })
    this.cache.writeData('user', user)
  }

  fetchData = async (token, groupId) => {
    const { location, history } = this.props
    const response = await this.client.query({ query: GROUP, variables: { token, id: groupId } })
    let { group, error } = response.data.group
    if (error && error.length > 0) {
      history.push('/profile') 
    }
    this.setState({ 
      group: { ...group, superUsers: JSON.parse(group.superUsers) }, 
      fetching: false 
    })
    this.cacheNewGroup(group)
  }

  changeTab = (tabName) => {
    const { user, group } = this.state
    if (tabName === 'settings' && !group.superUsers.includes(parseInt(user.id)))
      return
    else if (tabName === 'add-member' && group.isPersonal)
      return
    this.setState({ currentTab: tabName })
  }

  toggleHelp = () => {
    this.setState({ showHelp: !this.state.showHelp })
  }

  toggleEdit = taskId => {
    const { showEdit } = this.state
    if (showEdit) {
      this.setState({ showEdit: false, highlighted: null })
      return
    }
    this.setState({ showEdit: true, highlighted: taskId })
  }


  componentDidMount = async () => {
    const { client, match, location } = this.props
    const { id } = match.params
    let group, user, token
    if (location.state) { 
      group = location.state.group
      user = location.state.user
      token = location.state.token
    }
    this.client = client
    if (group == undefined || user == undefined || token == undefined) {
      try {
        const cachedUser = await this.cache.readData('user')
        const token = await this.cache.readData('token')
        const cachedGroup = cachedUser.groups.map(group => {
          let isValid = false
          group.users.map(user => {
            if (user.id == cachedUser.id) {
              isValid = true
            }
          })
          if (isValid) {
            return group
          }
        })[0]
        if (cachedGroup == undefined) {
          this.props.history.push('/profile')
        }
        this.token = token
        this.setState({ user: cachedUser, group: cachedGroup, fetching: true })
        this.fetchData(token, id)
      } catch (error) {
        console.log(error)
        this.props.history.push('/signin')
      }
    } else {
      this.setState({ user, group })
      this.token = token
      this.fetchData(token, id)
    }
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { fetching, user, group, currentTab, image, updatedAvatar } = this.state
    return (
      <div> 
        <Header fetching={fetching} pathname={pathname} history={history} />

        <div className="section info">

          <div className="containers margin-top">

            <div className="container of-info">
              <span className="title">Информация</span>
              <div className="avatar">
              <input type="file" onChange={this.uploadImage} name="image" accept="image/*" />
              {
                group.avatarUrl || image ? 
                  <img src={image || group.avatarUrl} alt="user-avatar" /> :
                  <i className="material-icons">file_upload</i>
              }
              </div>
              <div className="container-main">
                <div className="info equal-space">
                  <div className="name">
                    <span className="">{group ? group.name: ''}</span>
                  </div>
                  <p className="bigger">
                    Участников: <b>{group && group.users ? group.users.length : ''}</b>
                  </p>
                </div>
              </div>
            </div>

            <div className="container of-info">
              { group && !group.isPersonal && <span className="title leave right">Покинуть группу</span> }
              <div className="container-main menu">
                <div 
                  className={'menu-item ' + (currentTab === 'new-task' ? 'selected ' : '')} 
                  onClick={() => this.changeTab('new-task')}
                >
                  Новое задание
                </div>
                <div 
                  className={'menu-item ' + (currentTab === 'task-list' ? 'selected' : '')} 
                  onClick={() => this.changeTab('task-list')}
                >
                  Все задания
                </div>
                <div 
                  className={'menu-item ' + (currentTab === 'add-member' ? 'selected ' : '') + (group && group.isPersonal ? 'disabled' : '')} 
                  onClick={() => this.changeTab('add-member')}
                >
                  Добавить участника
                </div>
                <div 
                  className={
                    'menu-item ' + (currentTab === 'settings' ? 'selected ' : '') +
                    (group.superUsers && !group.superUsers.includes(parseInt(user.id)) ? 'disabled' : '')
                  }
                  onClick={() => this.changeTab('settings')}
                >
                  Настройки
                </div>
              </div>
            </div>

          </div>
        </div>

        { currentTab === 'new-task' && <NewTask groupId={group ? group.id : null} client={this.client} /> }
        { currentTab === 'task-list' && (
            <TaskList 
              tasks={group.tasks} 
              userIsAdmin={group.superUsers && group.superUsers.includes(parseInt(user.id)) ? true : false} 
            />
          ) 
        }
        { currentTab === 'add-member' && <AddMember user={user} token={this.token} group={group} client={this.client} /> }
        { currentTab === 'settings' && <Settings group={group}/> }

      </div>
    )
  }
}

export default withApollo(Group)