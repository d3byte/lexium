import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils/index'
import { GROUP } from '../../graphql/queries'


class Group extends Component {
  constructor() {
    super()
    this.state = {}
    this.client = {}
    this.cache = new CacheManager()
    this.token = ''
  }

  fetchData = async (token, groupId) => {
    const { location } = this.props
    const response = await this.client.query({ query: GROUP, variables: { token, id: groupId } })
    let { group, error } = response.data
    if (error && error.length > 0) {
      this.props.history.push('/profile')
    }
    group.superUsers = JSON.parse(group.superUsers)
    this.setState({ group, fetching: false })
  }

  componentDidMount = async () => {
    const { client, location } = this.props
    const { id } = location.params
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
          group.users.map(user => {
            if(user.id == cachedUser.id) {
              return group
            }
          })
        })[0]
        if (cachedGroup === undefined) {
          this.props.history.push('/profile')
        }
        this.token = token
        this.setState({  user: cachedUser,  group: cachedGroup, fetching: true })
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
    const { fetching } = this.state
    const { user, group } = this.props.location.state
    const { pathname } = this.props.location
    const { history } = this.props
    return (
      <div>
        <Header fetching={fetching} pathname={pathname} history={history} inputHandler={this.searchTasks} />
        <div className="section info">
          <span className="title">Информация</span>
          <div className="containers">
          <div className="container of-info">
              <div className="avatar">
                <img src={group ? group.avatarUrl : ''} alt="avatar"/>
              </div>
              <div className="container-main">
                <div className="info equal-space">
                  <div className="name">
                    <span className="">{group ? group.name : ''}</span>
                  </div>
                  <p className="bigger">Участников: <b>{group.users && group.users.length}</b></p>
                  <p className="lighten hover">Покинуть группу</p>
                </div>
                <div className="naming"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
  }
}

export default withApollo(Group)