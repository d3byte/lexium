import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { CacheManager } from '../../utils/index'

import './style.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      currentGroup: {}
    }
    this.cache = new CacheManager()
    this.token = ''
  }

  componentDidMount = async () => {
    const { client, user, token } = this.props
    if (!user || !token) {
      try {
        const cachedUser = await this.cache.readData('user')
        const currentGroup = await this.cache.readData('currentGroup')
        this.token = await this.cache.readData('token')
        console.log(this.token, currentGroup, cachedUser)
        this.setState({ user: cachedUser, currentGroup })
      } catch (error) {
        console.log(error)
        this.props.history.push('/signin')
      }
    } else {
      this.setState({ user, currentGroup: user.groups[0] })
      this.token = token
    }
  }
  
  

  render() {
    return (
      <div className="">
        <Header pathname={this.props.location.pathname} />
      
      </div>
    )
  }
}

export default withApollo(Profile)
