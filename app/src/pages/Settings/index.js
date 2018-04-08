import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import Button from '../../components/Button'
import Header from '../../components/Header'
import SettingsMenu from './subPages/SettingsMenu'

import './style.css'

import { CacheManager } from '../../utils/index'
import { USER } from '../../graphql/queries'
import { UPDATE_AVATAR } from '../../graphql/mutations'

class Settings extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      fetching: false,
      updatedAvatar: false,
    }
    this.cache = new CacheManager()
    this.client = {}
    this.token = ''
  }

  uploadImage = e => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    this.setState({ fetching: true })
    const reader = new FileReader()
    reader.onload = async e => {
      this.setState({ image: e.target.result })
      const user = await this.client.mutate({
        mutation: UPDATE_AVATAR, 
        variables: { token: this.token, avatarUrl: e.target.result } 
      })
      this.cache.writeData('user', user)
      if (user) {
        this.setState({ fetching: false, updatedAvatar: true })
      }
    }
    reader.readAsDataURL(file)
  }


  fetchData = async token => {
    const response = await this.client.query({ query: USER, variables: { token } })
    const { user } = response.data
    this.cache.writeData('user', user)
    this.setState({ user, fetching: false })
  }

  componentDidMount = async () => {
    const { client } = this.props
    this.client = client
    try {
      const cachedUser = await this.cache.readData('user')
      const token = await this.cache.readData('token')
      this.token = token
      this.setState({ user: cachedUser, fetching: true })
      this.fetchData(token)
    } catch (error) {
      console.log(error)
      this.props.history.push('/signin')
    }
  }

  render() {
    const { user, fetching, image, updatedAvatar } = this.state
    const { pathname } = this.props.location
    const { history } = this.props
    return (
      <div className="">
      <Header fetching={fetching} pathname={pathname} history={history} />
      <div className="settings section group-subpage">
        <div className="left containers">
          <div className="container container-settings">
            <span className="title">Аккаунт</span>
            <div className="avatar">
                {
                  updatedAvatar && <span className="loading-status">Изображение загружено</span>
                }
                <input type="file" onChange={this.uploadImage} name="image" accept="image/*" />
                {
                  user.avatarUrl || image ? 
                    <img src={image || user.avatarUrl} alt="user-avatar" /> :
                    <i className="material-icons">file_upload</i>
                }
              </div>
              <div className="container-main">
                <div className="form">
                  <div className="form-group">
                    <label>Логин</label>
                    <input type="text" className="line-based" placeholder={user && user.username} />
                  </div>
                  <div className="form-group">
                    <label>Почта</label>
                    <input type="text" className="line-based" placeholder={user && user.email} />
                  </div>
                <Button clickHandler={() => console.log('Ура!')} classNameProp="regular lighter" text="Сохранить" />
                </div>
              </div>
          </div>
        </div>
        <div className="right containers menu-container">
          <SettingsMenu/>
        </div>
    </div>
    </div>
    )
  }
}

export default withApollo(Settings)