import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils'
import { GROUP } from '../../graphql/queries'

import './style.css'

class Group extends Component {
  constructor() {
    super()
    this.state = {
      currentTab: 'task-list',
    }
    this.client = {}
    this.cache = new CacheManager()
    this.token = ''
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
  }

  changeTab = (tabName) => {
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
    }
  }

  render() {
    const { history } = this.props
    const { pathname } = this.props.location
    const { fetching, showHelp, showEdit, highlighted, user, group, currentTab } = this.state
    return (
      <div> 
        <Header fetching={fetching} pathname={pathname} history={history} />

        <div className="section info">

          <div className="containers margin-top">

            <div className="container of-info">
              <span className="title">Информация</span>
              <div className="avatar">
                <img src={group ? group.avatarUrl : ''} alt="avatar"/>
              </div>
              <div className="container-main">
                <div className="info equal-space">
                  <div className="name">
                    <span className="">{group ? group.name: ''}</span>
                  </div>
                  <p className="bigger">
                    Участников: <b>{group && group.users ? group.users.length : ''}</b>
                  </p>
                  <p className="lighten hover">Покинуть группу</p>
                </div>
              </div>
            </div>

            <div className="container of-info">
              <span className="title leave right">Покинуть группу</span>
              <div className="container-main menu">
                <div className={'menu-item ' + (currentTab == 'new-task' ? 'selected' : '')} onClick={() => this.changeTab('new-task')}>Новое задание</div>
                <div className={'menu-item ' + (currentTab == 'task-list' ? 'selected' : '')} onClick={() => this.changeTab('task-list')}>Все задания</div>
                <div className={'menu-item ' + (currentTab == 'add-member' ? 'selected' : '')} onClick={() => this.changeTab('add-member')}>Добавить участника</div>
                <div className={'menu-item ' + (currentTab == 'all-members' ? 'selected' : '')} onClick={() => this.changeTab('all-members')}>Все участники</div>
              </div>
            </div>

          </div>
        </div>

        {/* <div className="single-line">
          { currentTab == 'task-list' && <TaskList/> }
          { currentTab == 'new-task' && <TaskCreation/> }
          { currentTab == 'add-member' && <AddMember user={user}/> }
          { currentTab == 'all-members' && <AllMembers/> }
        </div> */}

      </div>
    )
  }
}

export default withApollo(Group)