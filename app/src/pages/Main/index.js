import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/Header'

import './style.css'
import { CacheManager } from '../../utils'
export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
    this.cache = new CacheManager()
  }

  componentWillMount = async () => {
    const user = await this.cache.readData('user')
    this.setState({ user })
  }
  

  render() {
    const { user } = this.state
    const { pathname } = this.props.location
    const { history } = this.props
    return (
      <div className="home-page">
        <Header pathname={pathname} history={history} lockMenu={user ? false : true} />
        <div className="section">
          <h1>Учить иностранные языки с Lexium - легко!</h1>
          <p>Просто <Link to="/signup">зарегистрируйтесь</Link> и попробуйте сами!
          </p>
        </div>
      </div>
    )
  }
}
